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
  text: "#333",
  background: "#fff",
  primary: "#6B5EFF",
  secondary: "#00F988",
};
const text = {
  default: {
    color: "text",
    fontSize: 3,
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
