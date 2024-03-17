import React from "react";
import { Navbar } from "./Pages/ContactPage/ContactNavbar";
// import ContactPage from "./Pages/ContactPage/ContactPage";
import { Outlet } from "react-router-dom";
import { AddContact } from "./Pages/ContactPage/AddContact";
import ContactPage from "./Pages/ContactPage/ContactPage";

const Layout = () => {
  return (
    <>
      <ContactPage />
      <Outlet />
    </>
  );
};

export default Layout;
