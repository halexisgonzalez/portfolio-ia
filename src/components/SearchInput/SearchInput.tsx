import type { ChangeEvent } from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ id, label, placeholder, value, onChange }: SearchInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="m21 20-5.6-5.6a7.5 7.5 0 1 0-1.4 1.4L20 21ZM4.5 10a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
        />
      </svg>
      <input
        id={id}
        type="search"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
