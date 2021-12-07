import { baseColors } from "./colors";

const breakpoints = ["400px", "52em", "64em"];
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];
const fonts = {
  body: '"font-name", sans-serif',
  heading: '"font-name", sans-serif',
  monospace: "",
};
const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96];
const fontWeights = {
  body: 400,
  heading: 700,
  bold: 700,
};
const lineHeights = {
  body: 1.5,
  heading: 1.125,
};
const colors = {
  ...baseColors,
  text: "#000",
  background: "#fff",
  primary: "#000",
};
const text = {
  default: {
    color: "text",
  },
  caps: {
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  heading: {
    fontFamily: "heading",
    fontWeight: "heading",
    lineHeight: "heading",
  },
  xxs: {
    fontSize: "0.625rem",
  },
  xs: {
    fontSize: "0.75rem",
  },
  s: {
    fontSize: "0.875rem",
  },
  m: {
    fontSize: "1rem",
  },
  l: {
    fontSize: "1.125rem",
  },
  xl: {
    fontSize: "1.25rem",
  },
  xxl: {
    fontSize: "1.5rem",
  },
};
const mediaQueries = {
  small: `@media screen and (min-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[1]})`,
  large: `@media screen and (min-width: ${breakpoints[2]})`,
};
const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};
export default {
  breakpoints,
  space,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  colors,
  text,
  mediaQueries,
  zIndex,
};
