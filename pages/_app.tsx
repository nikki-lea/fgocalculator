import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import Layout from './components/layout'
import { appWithTranslation } from 'next-i18next';


function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(App)
