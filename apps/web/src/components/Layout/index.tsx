import React, { ReactNode } from 'react';

import MetaTags, { MetaTagProps } from '@mooseical/ui/MetaTags';
import {
  DOMAIN_NAME,
  META_DESCRIPTION,
  META_TITLE,
  SITE_NAME,
} from '@utils/constants';

type Props = {
  className?: string;
  children?: ReactNode;
} & MetaTagProps;

const Layout = (props: Props) => {
  const {
    title = META_TITLE,
    description = META_DESCRIPTION,
    canonicalUrl = DOMAIN_NAME,
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
        canonicalUrl={canonicalUrl}
        siteName={SITE_NAME}
        noIndex={noIndex}
        {...ogp}
      />
      <main className={className}>{children}</main>
    </>
  );
};

export default Layout;
