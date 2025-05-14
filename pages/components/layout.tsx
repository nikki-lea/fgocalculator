import React from "react";
import Image from "next/image";
import copy from "../../data/copy";
import { useResizeDetector } from "react-resize-detector";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, ref } = useResizeDetector();
  return (
    <>
      <div className="container" ref={ref}>
        <div className="content-container">
          <div className="background-container">
            {width && width > 1186 && (
              <Image
                src="/lb6.jpg"
                alt="FGO SQ Calculator BG Desktop"
                layout="fill"
                loading="lazy"
              />
            )}
          </div>
          <main className="main-content">{children}</main>
        </div>
        <div className="header">
          {width && width <= 1186 && (
            <Image
              src="/castoria.png"
              alt="FGO SQ Calculator BG Mobile"
              width={180}
              height={60}
              style={{
                height: "100%"
              }}
            />
          )}
          <h1>{copy["header"]}</h1>
        </div>
      </div>
    </>
  );
};

export default Layout;
