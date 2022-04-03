import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MUSICIAN_QUERY_SIZE, MUSIC_QUERY_SIZE } from '@mooseical/constants';
import LeftArrow from '@assets/svg/leftArrow.svg';
import RightArrow from '@assets/svg/rightArrow.svg';
import { conditional } from '@mooseical/style-helpers';
import { usePagination } from '@utils/hooks/usePagination';
import styles from './styles.module.scss';

interface Props {
  pageType: 'music' | 'musician';
  currentPage: number;
  totalCount: number;
}

const Pagination = ({ pageType, currentPage, totalCount }: Props) => {
  const router = useRouter();

  const pageSize = useMemo(
    () => (pageType === 'music' ? MUSIC_QUERY_SIZE : MUSICIAN_QUERY_SIZE),
    [pageType]
  );

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    currentPage,
    siblingCount: 2,
  });

  const onFirstPage = currentPage === 1;
  const onLastPage =
    currentPage === paginationRange[paginationRange.length - 1];

  const url = useMemo(
    () =>
      pageType === 'music'
        ? `/music/${router.query.genre}`
        : `/musicians/${router.query.province}`,
    [pageType, router.query.genre, router.query.province]
  );

  return (
    <>
      {paginationRange.length > 1 && (
        <ul className={styles.pagination}>
          <li>
            <button
              type="button"
              disabled={onFirstPage}
              aria-label="previous page"
              onClick={() =>
                router.push({
                  pathname: url,
                  query: { page: currentPage - 1, type: router.query.type },
                })
              }
            >
              <LeftArrow />
            </button>
          </li>
          {paginationRange.map((pageNumber) => {
            if (pageNumber < 0) {
              return <li key={pageNumber}>&#8230;</li>;
            }
            return (
              <li key={pageNumber}>
                <Link
                  href={{
                    pathname: url,
                    query: { page: pageNumber, type: router.query.type },
                  }}
                >
                  <a
                    className={conditional(
                      currentPage === pageNumber,
                      styles.active
                    )}
                  >
                    {pageNumber}
                  </a>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              disabled={onLastPage}
              aria-label="next page"
              onClick={() =>
                router.push({
                  pathname: url,
                  query: {
                    page: currentPage + 1,
                    type: router.query.type,
                  },
                })
              }
            >
              <RightArrow />
            </button>
          </li>
        </ul>
      )}
      <Link href="/suggest-musician">
        <a className={styles.suggest}>
          Want to expand this list? Suggest a musician.
        </a>
      </Link>
    </>
  );
};

export default Pagination;
