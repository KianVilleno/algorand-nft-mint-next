import React from "react";
import { Box } from "theme-ui";
import styled from "@emotion/styled";

const GridItem = ({ item, imageKey }) => {
  const image = item[imageKey];

  return (
    <El>
      <img src={image} />
    </El>
  );
};

export default GridItem;

const El = styled(Box)`
  position: relative;
  opacity: 1;
  transition: opacity 0.8s ease;
  padding-bottom: 100%;
  img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    transition: opacity 0.8s ease;
    cursor: pointer;
  }
`;
