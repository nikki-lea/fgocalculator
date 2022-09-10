import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document: React.FC<{ children: React.ReactNode }> = () => {
  return (
    <Html lang="en">
      <Head>
      <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                  });
                      `}
        </Script>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Calculator for Fate Grand Order roll probabilities"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TB3CH6FH5G"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
