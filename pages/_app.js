import { CacheProvider, Global, css } from "@emotion/core";
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import { cache } from "emotion";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/client";

import "styles/fonts.css";

const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <GlobalStyle theme={theme} />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
};

export default App;

const GlobalStyle = (props) => {
  return (
    <Global
      styles={css`
        html {
          font-family: sans-serif;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        * {
          box-sizing: border-box;
        }
        body {
          font-family: ${props.theme.fonts.body};
        }
      `}
    />
  );
};
