import { FormEventHandler, ReactNode } from 'react';

import Spinner from '../../Spinner';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitting: boolean;
  submitMessage: string | null;
}

export const FormWrapper = ({
  children,
  onSubmit,
  submitting,
  submitMessage, // success or error message
}: Props) => {
  return (
    <>
      {submitting && (
        <div className={styles.submittingPage}>
          {submitMessage ? <>{submitMessage}</> : <Spinner />}
        </div>
      )}
      {!submitting && (
        <form className={styles.form} onSubmit={onSubmit}>
          {children}
        </form>
      )}
    </>
  );
};
