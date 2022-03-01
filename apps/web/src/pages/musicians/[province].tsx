import React from 'react';
import { GetServerSideProps } from 'next';

import { Province } from '@mooseical/schema';
import {
  GetManyMusiciansDocument,
  useGetManyMusiciansQuery,
} from '@mooseical/schema/web';
import { gqlClient, ssrCache } from '@graphql/gqlClient';
import { MUSICIAN_QUERY_SIZE } from '@mooseical/constants';
import Layout from '@components/Layout';
import setSSRCache from '@utils/setSSRCache';
import { DbFilter } from '@components/DbComponents/DbFilter';
import DbContainer from '@components/DbComponents/DbContainer';
import MusicianCard from '@components/Cards/MusicianCard';
import Pagination from '@components/DbComponents/Pagination';
import musicianSSRValidator from '@utils/validators/musicianSSRValidator';
import GqlContainer from '@components/GqlContainer';
import useProvinceParser from '@utils/hooks/useProvinceParser';

interface Props {
  province: Province | null;
  skip: number;
  currentPage: number | null;
}

const MusicianGrid = ({ province, skip, currentPage }: Props) => {
  const [{ data, fetching, error }] = useGetManyMusiciansQuery({
    variables: { take: MUSICIAN_QUERY_SIZE, skip, province },
  });

  const { name: provinceName, demonym } = useProvinceParser(province);

  return (
    <Layout
      title={`${demonym} Musicians Database | Mooseical`}
      description={`Explore the database of underground musicians based in ${provinceName} on Mooseical - Canadian Music Database.`}
      canonicalUrlPath={`/musicians/${province?.toLowerCase() ?? 'all'}`}
    >
      <h1>Musician Database</h1>
      <hr />
      <h2>{provinceName}</h2>
      <DbFilter page="musicians" />
      <GqlContainer fetching={fetching} error={error}>
        <DbContainer type="musician" tag="section">
          {data?.musicianList.map((doc) => (
            <MusicianCard key={doc.id} {...doc} />
          ))}
        </DbContainer>
        <Pagination
          pageType="musician"
          currentPage={currentPage || 1}
          totalCount={data?.musicianCount || 1}
        />
      </GqlContainer>
    </Layout>
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
