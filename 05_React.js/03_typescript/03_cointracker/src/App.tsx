import { RouterProvider } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import router from "./Routes/router";
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
    color: inherit;
  }
 

`;

function App() {
  return (
    <>
      <Globalstyle />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
