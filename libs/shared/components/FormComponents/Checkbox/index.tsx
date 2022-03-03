import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef(
  (
    { label, id, name, onBlur, value, onChange = () => {} }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      const checkbox = document.getElementById(id || '') as HTMLInputElement;
      if (checkbox.checked) setChecked(true);
    }, [id]);

    return (
      <label htmlFor={id} className={styles.checkbox}>
        <input
          ref={ref}
          id={id}
          name={name}
          onChange={(e) => {
            setChecked(!checked);
            onChange(e);
          }}
          onBlur={onBlur}
          type="checkbox"
          value={value}
        />
        <span className={checked ? styles.checked : styles.unchecked} />
        {label}
      </label>
    );
  }
);
