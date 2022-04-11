import React, { Fragment, HTMLAttributes } from 'react';
import Link from 'next/link';

import { MusicCardFragment } from '@mapledb/schema/types/web';
import { combine } from '@mapledb/style-helpers';
import styles from './styles.module.scss';

interface Props {
  musicians: MusicCardFragment['musicians'] | undefined;
  nonCanadians: MusicCardFragment['nonCanadians'] | undefined;
  className?: HTMLAttributes<HTMLUListElement>['className'];
  shouldConcat?: boolean;
}

const MusicianLinkList = ({
  musicians,
  nonCanadians,
  className,
  shouldConcat = false,
}: Props) => {
  if (
    shouldConcat &&
    (musicians?.length || 0) + (nonCanadians?.length || 0) > 3
  ) {
    return <div className={styles.va}>Various Artists</div>;
  }

  return (
    <ul className={combine(styles.list, className)}>
      {musicians?.map((musician) => (
        <Fragment key={musician.id}>
          {musician ? (
            <li>
              <Link href={`/musicians/m/${musician.id}`}>
                <a title={`Musician: ${musician.name}`}>{musician.name}</a>
              </Link>
            </li>
          ) : null}
        </Fragment>
      ))}
      {nonCanadians?.map((musician) => (
        <li className={styles.nonCad} key={musician}>
          {musician}
        </li>
      ))}
    </ul>
  );
};

export default MusicianLinkList;
