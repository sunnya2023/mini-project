import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./routes/Firebase";
import ProtectRouter from "./components/ProtectRouter";
import ChangePassword from "./components/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRouter>
        <Layout />
      </ProtectRouter>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/reset-password",
    element: <ChangePassword />,
  },
]);

const GlobalStyle = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    //wait for firebase
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyle />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <RouterProvider router={router}></RouterProvider>
      )}
    </Wrapper>
  );
}

export default App;
