import React from "react";
import ReactDOM from "react-dom/client";
// import { ThemeProvider } from "styled-components";
// import { darkTheme, lightTheme } from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
// import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const darkTheme = {
//   textColor: "whitesmoke",
//   bgColor: "#111",
// };
// const lightTheme = {
//   textColor: "#111",
//   bgColor: "whitesmoke",
// };

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider> */}
  </React.StrictMode>
);
