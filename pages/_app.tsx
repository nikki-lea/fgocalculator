import "../styles/antd.less";
import React from "react";
import type { AppProps } from "next/app";
import Layout from "./components/layout";
import { ThemeProvider } from "@mui/material";
import Ereshkigal from "../styles/ereshkigal";
import { FgoProvider } from "../contexts";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={Ereshkigal}>
        <Layout>
          <FgoProvider>
            <Component {...pageProps} />
          </FgoProvider>
        </Layout>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
