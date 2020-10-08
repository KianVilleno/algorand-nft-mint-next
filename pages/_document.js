import Document, { Html, Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/static/fonts/font-name.woff2"
            as="style"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  const styles = extractCritical(initialProps.html);

  return {
    ...initialProps,
    styles: (
      <>
        {[...React.Children.toArray(initialProps.styles)]}
        <style
          data-emotion-css={styles.ids.join(" ")}
          dangerouslySetInnerHTML={{ __html: styles.css }}
        />
      </>
    ),
  };
};

export default MyDocument;
