import { createTheme } from "@mui/material";

const Ereshkigal = createTheme({
  palette: {
    success: {
      main: "#CB2448"
    },
    secondary: {
      main: "#CCCCCC"
    },
    primary: {
      main: "#DDB466"
    },
    info: {
      main: "#7F0219"
    },
    warning: {
      main: "#000000"
    }
  },
  typography: {
    fontFamily: "Montserrat, sans-serif"
  }
});

export default Ereshkigal;
