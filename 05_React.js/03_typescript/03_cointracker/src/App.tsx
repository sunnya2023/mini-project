import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import router from "./Routes/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lighttheme, darkTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

const Globalstyle = createGlobalStyle`
 ${reset}

*{
  box-sizing: border-box;
}
  body{
    background: ${(props) => props.theme.bgColor};
    font-family: "Source Code Pro", monospace;
  }
  a{
    text-decoration: none;
    color: inherit
  }
 

`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lighttheme}>
        <Globalstyle />
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
