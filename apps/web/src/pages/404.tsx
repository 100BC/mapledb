import React from 'react';

import ErrorComponent from '@components/ErrorComponent';
import Layout from '@components/Layout';

const Custom404 = () => {
  return (
    <Layout>
      <ErrorComponent errorNum={404} />
    </Layout>
  );
};

export default Custom404;
