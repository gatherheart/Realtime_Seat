import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  public render() {
    return (
      <html>
        <title>Booking Analytics</title>
        <meta property="og:url" content="https://" />
        <meta property="og:title" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:site_name" content="" />
        <meta property="og:description" content="" />
        <meta property="og:locale:alternate" content="ko_KR" />
        <link rel="shortcut icon" href="" />
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=medium-dpi"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
