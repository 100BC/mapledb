import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { conditional } from '@mooseical/style-helpers';
import useDbFilter from '@utils/hooks/useDbFilter';
import styles from './styles.module.scss';

interface Props {
  page: 'music' | 'musicians';
}

export const DbFilter = ({ page }: Props) => {
  const { push } = useRouter();
  const { queryValue, params } = useDbFilter(page);

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
          value={queryValue}
          onChange={(e) => onChange(e)}
        >
          {params.map((tab) => (
            <option value={tab.value} key={tab.value}>
              {tab.select ?? tab.title}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.tabsContainer}>
        {params.map((tab) => (
          <Link href={`/${page}/${tab.value}`} key={tab.value}>
            <a
              className={conditional(queryValue === tab.value, styles.active)}
              title={`${tab.title} ${page}`}
            >
              {tab.title}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};
