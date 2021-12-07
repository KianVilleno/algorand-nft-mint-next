import { Box } from "theme-ui";

import { initializeApollo } from "apollo/client";
import { GET_ALL_DEMO } from "queries";

import GridIndex from "components/Grid";
import Seo from "components/Seo";

const Index = ({ demoData }) => {
  return (
    <>
      <Seo title="Standing By / Contentful Demo" />
      <Box p="4">
        {demoData && (
          <GridIndex items={demoData.assetCollection.items} imageKey="url" />
        )}
      </Box>
    </>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo(null, false);

  const demoResult = await apolloClient.query({
    query: GET_ALL_DEMO,
  });

  const { data: demoData } = demoResult;

  return {
    props: {
      demoData,
    },
  };
}

export default Index;
