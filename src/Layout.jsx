import React from "react";
import { Navbar } from "./Pages/Home/ContactNavbar";
// import Home from "./Pages/Home/Home";
import { Outlet } from "react-router-dom";
import { AddContact } from "./Pages/Home/AddContact";
import Home from "./Pages/Home/Home";

const Layout = () => {
  return (
    <>
      <Home />
      <Outlet />
    </>
  );
};

export default Layout;
