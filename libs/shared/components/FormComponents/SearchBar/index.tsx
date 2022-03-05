import React from 'react';
import { useForm } from 'react-hook-form';

import SearchSvg from '@mooseical/assets/svg/search.svg';
import styles from './styles.module.scss';

interface Props {
  placeholder?: string;
  id?: string;
  searchFunction: (arg0: string) => void;
}

interface Form {
  search: string;
}

export const SearchBar = ({
  placeholder = 'Search',
  id = 'search-bar',
  searchFunction,
}: Props) => {
  const { register, handleSubmit } = useForm<Form>();

  const onSubmit = (data: Form) => {
    searchFunction(data.search);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.search}>
        <label htmlFor="search-bar">{placeholder}</label>
        <input
          id={id}
          className={styles.search}
          placeholder={placeholder}
          type="search"
          {...register('search', { required: 'true' })}
        />
        <button type="submit">
          <SearchSvg arialabel="search" />
        </button>
      </div>
    </form>
  );
};
