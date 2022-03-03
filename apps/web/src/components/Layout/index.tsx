import React, { ReactNode } from 'react';

import MetaTags, { MetaTagProps } from '@mooseical/shared/components/MetaTags';
import { XOR } from '@mooseical/generics';
import DesktopNav from '@components/Nav/DesktopNav';
import Footer from '@components/Footer';
import MobileNav from '@components/Nav/MobileNav';
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
    noIndex,
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
        noIndex={noIndex}
        {...ogp}
      />
      <DesktopNav />
      <main className={className}>{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
};

export default Layout;
