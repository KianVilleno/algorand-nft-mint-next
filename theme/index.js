const breakpoints = ["400px", "52em", "64em"];

export default {
  fonts: {
    body: '"font-name", sans-serif',
    heading: '"font-name", sans-serif',
    monospace: "",
  },
  colors: {
    text: "#333",
    background: "#fff",
    primary: "#6B5EFF",
    secondary: "#00F988",
  },
  mediaQueries: {
    small: `@media screen and (min-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },
};
