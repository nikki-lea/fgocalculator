import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: React.FC<{children: React.ReactNode}> = () => {
    return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=optional" rel="stylesheet" />
        <meta name="description" content="Calculator for Fate Grand Order roll probabilities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </Html>
    )
  }

  export default Document

  