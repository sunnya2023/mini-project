// import React from "react";
import Nav from "./comp/Nav";
import { BrowserRouter } from "react-router-dom";
import Rout from './comp/Rout';
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Rout/>
      </BrowserRouter>
    </>
  );
}

export default App;
