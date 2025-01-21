import React, { Suspense } from "react";
import { ThemeProvider } from "@core/theme/themeContext";
import { FrameLayoutProvider } from "./frameLayout/frameLayoutContext";

import "@src/assets/scss/base/normalize.css";
import Routes from "./router";

function App() {
  return (
    <ThemeProvider>
      <FrameLayoutProvider>
        <Suspense>
          <Routes />
        </Suspense>
      </FrameLayoutProvider>
    </ThemeProvider>
  );
}

export default App;
