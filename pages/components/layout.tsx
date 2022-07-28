import Head from 'next/head'
import Image from 'next/image'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
    <>
      <Head>
        <title>Fate Grand Order Probability Calculator</title>
        <meta name="description" content="Calculator for Fate Grand Order roll probabilities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image height={1078} width={2133} src="/67BrG93.jpeg" />
        <h1>Fate Grand Order Probability Calculator</h1>
          <main>{children}</main>
      </>
    )
  }

  export default Layout