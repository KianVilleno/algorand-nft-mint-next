import { useQuery } from "@apollo/client";
import { initializeApollo } from "apollo/client";
import { GET_ALL_DEMO } from "queries";
import { Box } from "theme-ui";
import Head from "next/head";

const Index = () => {
  const { loading, error, data } = useQuery(GET_ALL_DEMO);
  if (loading) return null;
  const artists = data.artistCollection.items;
  return (
    <>
      <Head>
        <title>Standing By / Contentful Demo</title>
      </Head>
      <Box p="4">
        {artists.map(({ name, slug }, i) => (
          <div key={i}>{name}</div>
        ))}
      </Box>
    </>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_ALL_DEMO,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
