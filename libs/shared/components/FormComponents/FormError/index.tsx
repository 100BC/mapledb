import { FieldError } from 'react-hook-form';

import styles from './styles.module.scss';

interface Props {
  error: FieldError | undefined | boolean;
  message?: string;
}

export const FormError = ({
  error,
  message = 'This field is required',
}: Props) => {
  return <>{error && <div className={styles.error}>{message}</div>}</>;
};
