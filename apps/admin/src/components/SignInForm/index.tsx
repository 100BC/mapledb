import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import {
  FormError,
  TextInput,
} from '@mapledb/shared/components/FormComponents';
import Button from '@mapledb/shared/components/Button';
import Spinner from '@mapledb/shared/components/Spinner';

import Layout from '@components/Layout';
import { auth } from '@gcp/client';


interface Form {
  email: string;
  password: string;
  authError?: string;
}

const SignInForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    setSubmitting(true);
    await signInWithEmailAndPassword(auth, data.email, data.password).catch(
      (err: FirebaseError) => {
        reset({}, { keepValues: true });
        setError('authError', { type: 'manual', message: err.message });
      }
    );

    setSubmitting(false);
  };

  return (
    <Layout>
      <h1>Sign In</h1>
      {submitting ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id="email"
            {...register('email', {
              required: true,
              onChange: () => clearErrors('authError'),
            })}
            label="Email"
            type="email"
          />
          <FormError error={errors.email} />

          <TextInput
            id="password"
            {...register('password', {
              required: true,
              onChange: () => clearErrors('authError'),
            })}
            label="Password"
            type="password"
          />
          <FormError error={errors.password} />

          <FormError
            error={errors.authError}
            message={errors.authError?.message}
          />

          <Button type="submit" style={{ marginTop: '4rem' }}>
            Sign In
          </Button>
        </form>
      )}
    </Layout>
  );
};

export default SignInForm;
