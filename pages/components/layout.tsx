import Image from 'next/image'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
    <>
        <div className="hero-image">
          <Image height={1078} width={2133} layout="responsive" src="N0ypp0d.jpeg" alt="Cute Ereshkigal Background"/>
        </div>
        <main>{children}</main>
      </>
    )
  }

  export default Layout

  
