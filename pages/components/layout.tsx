import Image from 'next/image'
import Locale from './locale'
import { useTranslation } from 'react-i18next';

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const { t } = useTranslation();
    const headerText = t("header");
    return (
    <>
        <div className="container">
          <div className="content-container">
              <Image src="https://i.imgur.com/N0ypp0d.webp" layout="responsive" alt="Cute Ereshkigal Background"/>
            <main className="main-content">{children}</main>
          </div>
          <div className="header">
            <h1>{headerText}</h1>
            <Locale />
          </div>
        </div>
      </>
    )
  }

  export default Layout

  
