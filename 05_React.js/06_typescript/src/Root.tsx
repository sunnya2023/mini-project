import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

export const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
 