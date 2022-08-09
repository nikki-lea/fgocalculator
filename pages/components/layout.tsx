import { TFunction } from 'next-i18next'
import Image from 'next/image'
import Locale from './locale'

const Layout: React.FC<{children: React.ReactNode, transFn: TFunction}> = ({children, transFn}) => {
    return (
    <>
        <div className="container">
          <div className="hero-image">
            <Image height={3157} width={5120} src="N0ypp0d.jpeg" alt="Cute Ereshkigal Background"/>
          </div>
          <div className="header">
            <h1>{transFn("header")}</h1>
            <Locale />
          </div>
          <main>{children}</main>
        </div>
      </>
    )
  }

  export default Layout

  
