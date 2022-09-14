import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document: React.FC<{ children: React.ReactNode }> = () => {
  return (
    <Html lang="en">
      <Head>
      <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-TB3CH6FH5G`}
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-TB3CH6FH5G', {
                    page_path: window.location.pathname,
                  });
                      `}
        </Script>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <title>2022 Updated FGO SQ Savings Calculator</title>
        <meta
          name="description"
          content="Add your current summon currency, your summon targets, and figure out how much you need to save for the targets you want most."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://fgosavings.com"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
