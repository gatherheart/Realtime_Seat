import App, { Container } from 'next/app';
import React from 'react';

class MyApp extends App {
  public static async getInitialProps(initial) {
    let pageProps = {};
    const { Component, ctx } = initial;

    // console.log('initial: ', initial);
    // console.log('context', ctx);
    if (Component.getInitialProps) {
      // Call page-level getInitialProps
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
