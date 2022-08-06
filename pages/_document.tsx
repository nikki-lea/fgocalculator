import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import i18nextConfig from '../next-i18next.config'

const Document: React.FC<{children: React.ReactNode}> = () => {
    return (
    <Html lang={i18nextConfig.i18n.defaultLocale}>
      <Head>
        <meta name="description" content="Calculator for Fate Grand Order roll probabilities" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;600&display=optional" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </Html>
    )
  }

  export default Document

  