import styled from "@emotion/styled";
import { Box, Text } from "@theme-ui/components";
import React from "react";

const themeUI = () => {
  return (
    <Wrapper>
      <Text>Grey</Text>
      <ColorPalette color="grey" />
      <Text>Red</Text>
      <ColorPalette color="red" />
      <Text>Orange</Text>
      <ColorPalette color="orange" />
      <Text>Yellow</Text>
      <ColorPalette color="yellow" />
      <Text>Green</Text>
      <ColorPalette color="green" />
      <Text>Teal</Text>
      <ColorPalette color="teal" />
      <Text>Blue</Text>
      <ColorPalette color="blue" />
      <Text>Cyan</Text>
      <ColorPalette color="cyan" />
      <Text>Purple</Text>
      <ColorPalette color="purple" />
      <Text>Pink</Text>
      <ColorPalette color="pink" />
      <Text as="p" variant="xxl">
        Font Size XXL
      </Text>
      <Text as="p" variant="xl">
        Font Size XL
      </Text>
      <Text as="p" variant="l">
        Font Size L
      </Text>
      <Text as="p" variant="m">
        Font Size m
      </Text>
      <Text as="p" variant="s">
        Font Size S
      </Text>
      <Text as="p" variant="xs">
        Font Size XS
      </Text>
      <Text as="p" variant="xxs">
        Font Size XXS
      </Text>
      <kbd>HELLO</kbd>
    </Wrapper>
  );
};

const ColorPalette = ({ color }) => {
  const shades = new Array(10).fill(0).map((_, i) => (i > 0 ? i * 100 : 50));
  return (
    <ColorPaletteWrapper>
      {shades.map((shade) => (
        <ColorPaletteBox shade={shade} color={color} />
      ))}
    </ColorPaletteWrapper>
  );
};

export default themeUI;

const Wrapper = styled(Box)``;

const ColorPaletteBox = styled(Box)`
  background-color: ${({ theme, shade, color }) => theme.colors[color][shade]};
  width: 50px;
  height: 50px;
`;

const ColorPaletteWrapper = styled(Box)`
  display: flex;
`;
