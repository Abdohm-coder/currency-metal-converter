// import '../styles/globals.css';
import {Head, Html, Main, NextScript} from 'next/document';

function MyApp({ Component, pageProps }) {
  return (
    <Html lang="en">
        <Head>
            <meta name="description" content="A Web App check for price of currencies and metals" />
            <meta name="keywords" content="currencies, currencies converter, gold price, sliver price"></meta>
            <meta property='og:title' content='Currency And Metal Converter' />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link property="canonical" href="http://sotrav-dz.com/" />
            <meta property="og:locale" content="en_US" />
            <meta property="website:tag" content="curreny" />
            <meta property="website:tag" content="metal" />
            <meta property="website:tag" content="coverter" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  );
}

export default MyApp
