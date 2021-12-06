import "styles/fonts.css";

import { useRouter } from "next/dist/client/router";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/client";

import { Global, css } from "@emotion/react";
import { ThemeProvider } from "theme-ui";
import theme from "theme";

import { AnimatePresence } from "framer-motion";
import PageAnimWrap from "components/PageAnimWrap";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <AnimatePresence exitBeforeEnter>
          <PageAnimWrap motionKey={router.asPath}>
            <Component {...pageProps} />
          </PageAnimWrap>
        </AnimatePresence>
      </ThemeProvider>
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
