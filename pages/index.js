import React from "react";
import { Box } from "theme-ui";
import Link from "next/link";
import styled from "@emotion/styled";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>Standing By / Contentful & Nextjs</title>
      </Head>
      <DemoStyled p="4">
        Home :)
        <br />
        <Link href="/contentful-demo">Contenful Graphql Demo</Link>
      </DemoStyled>
    </>
  );
};

export default Index;

const DemoStyled = styled(Box)`
  color: ${(props) => props.theme.colors.text};
`;
