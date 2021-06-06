import React from "react";
import { Box } from "theme-ui";
import Link from "next/link";
import styled from "@emotion/styled";
import GridItem from "./Item";

const GridIndex = ({ posts }) => {
  return (
    <El>
      {posts.map((post, i) => (
        <GridItem key={i} post={post} />
      ))}
    </El>
  );
};

export default GridIndex;

const gridCols = "4";
const gridPadding = "10vw";

const El = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(${gridCols}, 1fr);
  grid-column-gap: 10vw;
  grid-column-gap: ${gridPadding};
  grid-row-gap: 10vw;
  grid-row-gap: ${gridPadding};
  padding-bottom: 10vw;
  padding-bottom: ${gridPadding};
`;
