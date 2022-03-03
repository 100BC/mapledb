import React, { ReactNode } from 'react';

import { XOR } from '@mooseical/generics';
import MetaTags, { MetaTagProps } from '@mooseical/shared/components/MetaTags';
import Header from '@components/Header';
import {
  DOMAIN_NAME,
  META_DESCRIPTION,
  META_TITLE,
  SITE_NAME,
} from './defaults';

export * from './defaults';

type Props = {
  className?: string;
  children?: ReactNode;
} & MetaTagProps &
  XOR<{ canonicalUrl?: string }, { canonicalUrlPath?: string }>;

const Layout = (props: Props) => {
  const {
    title = META_TITLE,
    description = META_DESCRIPTION,
    canonicalUrl = DOMAIN_NAME,
    canonicalUrlPath = '',
    className,
    children,
    ...ogp
  } = props;

  return (
    <>
      <MetaTags
        title={title}
        description={description}
        canonicalUrl={[canonicalUrl, canonicalUrlPath].join('')}
        siteName={SITE_NAME}
        noIndex
        {...ogp}
      />
      <Header />
      <main className={className}>{children}</main>
    </>
  );
};

export default Layout;
