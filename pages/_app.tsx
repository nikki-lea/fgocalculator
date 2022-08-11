import "../styles/antd.less";
import React from 'react'
import type { AppProps } from 'next/app'
import Layout from './components/layout'
import { ThemeProvider } from '@mui/material';
import Ereshkigal from '../styles/ereshkigal'
import '../i18n/config';



function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Ereshkigal}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;