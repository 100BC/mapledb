import React, { ReactNode } from 'react';

import { XOR } from '@mooseical/generics';
import MetaTags, { MetaTagProps } from '@mooseical/shared/components/MetaTags';
import Header from '@components/Header';
import { META_TITLE } from './defaults';

export * from './defaults';

type Props = {
  className?: string;
  children?: ReactNode;
} & MetaTagProps &
  XOR<{ canonicalUrl?: string }, { canonicalUrlPath?: string }>;

const Layout = (props: Props) => {
  const {
    title = META_TITLE,
    description,
    canonicalUrl,
    canonicalUrlPath = '',
    className,
    children,
    ...ogp
  } = props;

  return (
    <>
      <MetaTags title={title} siteName="Admin" noIndex {...ogp} />
      <Header />
      <main className={className}>{children}</main>
    </>
  );
};

export default Layout;
