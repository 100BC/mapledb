import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Genre, Province } from '@mooseical/gql-types/types.generated';
import { conditional } from '@mooseical/style-helpers';
import getProvinceName from '@utils/functions/getProvinceName';
import styles from './styles.module.scss';

interface Props {
  page: 'music' | 'musicians';
}

export const DbFilter = ({ page }: Props) => {
  const { push, query } = useRouter();

  const useGenre = page === 'music';
  const tabType = useGenre ? Genre : Province;
  const queryType = query[useGenre ? 'genre' : 'province'];
  const defaultText = useGenre ? 'All Genres' : 'Canada';

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const endpoint = e.target.value;
    push(`/${page}/${endpoint}`);
  };

  // Shows the select on small screens <=768px
  return (
    <>
      <div className={styles.selectContainer}>
        <label className={styles.label} htmlFor="select">
          Filter:
        </label>
        <select
          className={styles.select}
          id="select"
          name="genres"
          value={queryType}
          onChange={(e) => onChange(e)}
        >
          <option value="all">{defaultText}</option>
          {Object.values(tabType).map((select) => (
            <option value={select.toLowerCase()} key={select}>
              {useGenre ? select.toLowerCase() : getProvinceName(select)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.tabsContainer}>
        <Link href={`/${page}/all`}>
          <a
            className={conditional(queryType === 'all', styles.active)}
            title={`collection of Canadian ${page}`}
          >
            {defaultText}
          </a>
        </Link>
        {Object.values(tabType).map((tab) => (
          <Link href={`/${page}/${tab.toLowerCase()}`} key={tab}>
            <a
              className={conditional(
                queryType === tab.toLowerCase(),
                styles.active
              )}
              title={`collection of ${
                useGenre ? tab.toLowerCase() : tab
              } ${page}`}
            >
              {useGenre ? tab.toLowerCase() : tab}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};
