import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./route/MainRouter";

import "./App.css";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </StyledEngineProvider>
  );
};

export default App;
