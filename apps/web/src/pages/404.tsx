import ServerError from '@components/ServerError';
import MainLayout from '@layouts/Main';

const Custom404 = () => {
  return (
    <MainLayout>
      <ServerError errorNum={404} />
    </MainLayout>
  );
};

export default Custom404;
