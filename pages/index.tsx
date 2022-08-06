import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Home: NextPage = () => {
  const { t } =  useTranslation();
    return (
      <div>
        <p>{t("header")}</p>
      </div>
    )
  }

export async function getStaticProps({ locale }: {locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}


export default Home