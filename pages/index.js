import React from "react";
import Head from "next/head";
import GridIndex from "components/Grid";

import { getNotionPosts } from "utils/notion";

const Index = ({ posts }) => {
  console.log("2. posts", posts);

  return (
    <>
      <Head>
        <title>Standing By</title>
      </Head>
      {posts && <GridIndex posts={posts} />}
    </>
  );
};

export default Index;

export async function getStaticProps() {
  // const apolloClient = initializeApollo();
  // const props = await apolloClient.query({
  //   query: GET_ALL_DEMO,
  // });

  const posts = await getNotionPosts();

  console.log("1. posts", posts);

  return {
    props: {
      posts,
    },
  };
}
