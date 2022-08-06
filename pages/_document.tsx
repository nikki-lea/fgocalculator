import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: React.FC<{children: React.ReactNode}> = () => {
    return (
    <Html>
      <Head>
        <meta name="description" content="Calculator for Fate Grand Order roll probabilities" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=optional" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </Html>
    )
  }

  export default Document

  