import React from "react";
import Image from "next/future/image";
import copy from '../../data/copy';
import { useResizeDetector } from 'react-resize-detector';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, ref } = useResizeDetector();
  return (
    <>
      <div className="container" ref={ref}>
        <div className="content-container">
          <div className="background-container">
            {width && width > 1186 &&
              <Image
                src="/ereshkigal-background.jpg"
                alt="FGO SQ Savings Calculator BG"
                style={{
                  position: "fixed",
                  height: "auto",
                  width: "120vw",
                  marginTop: "-100px"
                }}
              />
            }
            {width && width <= 1186 &&
              <Image
                src="/ereshkigal-background.jpg"
                alt="FGO SQ Savings Calculator BG"
                style={{
                  position: "relative",
                  height: "auto",
                  width: "100vw"
                }}
              />
            }
          </div>
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
