import "../styles/antd.less";
import React from 'react'
import type { AppProps } from 'next/app'
import Layout from './components/layout'
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


function App({ Component, pageProps }: AppProps) {
  const { t } =  useTranslation();
  return (
    <Layout transFn={t} >
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(App)


export async function getStaticProps({ locale }: {locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
