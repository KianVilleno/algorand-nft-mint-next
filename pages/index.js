import React from "react";
import Head from "next/head";
import axios from "axios";
import GridIndex from "components/Grid";
import Seo from "components/Seo";

const Index = ({ posts }) => {
  return (
    <>
      <Seo title="Standing By" isHome />
      {posts && <GridIndex posts={posts} />}
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const fetchData = await axios.get(
    "https://picsum.photos/v2/list?page=2&limit=100"
  );

  const { data: posts } = fetchData;

  return {
    props: {
      posts,
    },
  };
}
