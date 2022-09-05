import { GetServerSideProps } from 'next';

import { Province } from '@mapledb/schema/types';
import { GetManyMusiciansDocument } from '@mapledb/schema/types/web';
import { MUSICIAN_QUERY_SIZE } from '@mapledb/constants';

import { gqlClient, ssrCache } from '@graphql/gqlClient';
import MainLayout from '@layouts/Main';
import setSSRCache from '@utils/setSSRCache';
import { DbFilter } from '@components/DatabaseFilters/DbFilter';
import CardGridLayout from '@layouts/CardGrid';
import MusicianCard from '@components/Cards/MusicianCard';
import Pagination from '@components/DatabaseFilters/Pagination';
import musicianSSRValidator from '@utils/validators/musicianSSRValidator';
import UrqlStateLayout from '@layouts/UrqlState';
import useParseProvince from '@utils/hooks/useParseProvince';
import { useGetManyMusiciansQuery } from '@graphql/hooks';

interface Props {
  province: Province | null;
  skip: number;
  currentPage: number | null;
}

const MusicianGrid = ({ province, skip, currentPage }: Props) => {
  const [{ data, fetching, error }] = useGetManyMusiciansQuery({
    variables: { take: MUSICIAN_QUERY_SIZE, skip, province },
  });

  const { name: provinceName, demonym } = useParseProvince(province);

  return (
    <MainLayout
      title={`MapleDB | ${demonym} Musicians Database`}
      description={`Explore the database of underground musicians based in ${provinceName} on MapleDB - Canadian Music Database.`}
      canonicalUrlPath={`/musicians/${province?.toLowerCase() ?? 'all'}`}
    >
      <h1>Musician Database</h1>
      <hr />
      <h2>{provinceName}</h2>
      <DbFilter page="musicians" />
      <UrqlStateLayout fetching={fetching} error={error}>
        <CardGridLayout type="musician" tag="section">
          {data?.musicianList.map((doc) => (
            <MusicianCard key={doc.id} {...doc} />
          ))}
        </CardGridLayout>
        <Pagination
          pageType="musician"
          currentPage={currentPage || 1}
          totalCount={data?.musicianCount || 1}
        />
      </UrqlStateLayout>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
  query,
}) => {
  if (!musicianSSRValidator(params?.province, query.page)) {
    return {
      notFound: true,
    };
  }

  setSSRCache(res, 1);

  const province =
    params!.province === 'all'
      ? null
      : (params!.province as string).toUpperCase();

  const skip = query.page
    ? MUSICIAN_QUERY_SIZE * (parseInt(query.page as string, 10) - 1)
    : 0;

  // In order to get static generation and render the components properly,
  // the initial query must match the query of client
  const musicians = await gqlClient
    .query(GetManyMusiciansDocument, {
      take: MUSICIAN_QUERY_SIZE,
      skip,
      province,
    })
    .toPromise();

  return {
    props: {
      province,
      skip,
      currentPage: query.page ? parseInt(query.page as string, 10) : null,
      urqlState: musicians.data ? ssrCache.extractData() : null,
      key: params?.province, // Allows the state to reset on new path
    },
  };
};

export default MusicianGrid;
