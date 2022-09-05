import { useForm } from 'react-hook-form';

import SearchSvg from '@assets/svg/search.svg';

import styles from './styles.module.scss';

interface Props {
  placeholder?: string;
  id?: string;
  searchFunction: (arg0: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface Form {
  search: string;
}

export const SearchBar = ({
  placeholder = 'Search',
  id = 'search-bar',
  searchFunction,
  className,
  style,
}: Props) => {
  const { register, handleSubmit } = useForm<Form>();

  const onSubmit = (data: Form) => {
    searchFunction(data.search);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} style={style}>
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
          <SearchSvg />
        </button>
      </div>
    </form>
  );
};
