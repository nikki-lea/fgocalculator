import Image from 'next/image'
import Locale from './locale'
import { useTranslation } from 'react-i18next';

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const { t } = useTranslation();
    const headerText = t("header");
    return (
    <>
        <div className="container">
          <div className="hero-image">
            <Image height={3157} width={5120} src="N0ypp0d.jpeg" alt="Cute Ereshkigal Background"/>
          </div>
          <div className="header">
            <h1>{headerText}</h1>
            <Locale />
          </div>
          <main>{children}</main>
        </div>
      </>
    )
  }

  export default Layout

  
