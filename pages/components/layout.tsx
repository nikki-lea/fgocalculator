import Head from 'next/head'
import Image from 'next/image'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
    <>
      <Head>
        <title>Fate Grand Order Probability Calculator</title>
        <meta name="description" content="Calculator for Fate Grand Order roll probabilities" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat" rel="stylesheet" />
      </Head>
      <div className="main-container">
        <div className="hero-image">
          <h1 className="header">Fate Grand Order Probability Calculator</h1>
          <Image height={1078} width={2133} layout="responsive" src="/67BrG93.jpeg" />
        </div>
        <main>{children}</main>
      </div>
      </>
    )
  }

  export default Layout