import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { Root } from "./Root";
import About from "./screen/About";
import Home from "./screen/Home";
import NotFound from "./screen/NotFound";
import { User } from "./screen/users/User";
import Followers from "./screen/users/Followers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:userId",
        element: <User />,
        children: [
          {
            path: "followers",
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
