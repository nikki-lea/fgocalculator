import React from "react";
import Image from "next/image";
import copy from '../../data/copy';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="container">
        <div className="content-container">
          <Image
            width={1870}
            height={1153}
            src="https://i.imgur.com/N0ypp0d.webp"
            layout="responsive"
            alt="Cute Ereshkigal Background"
          />
          <main className="main-content">{children}</main>
        </div>
        <div className="header">
          <h1>{copy["header"]}</h1>
        </div>
      </div>
    </>
  );
};

export default Layout;
