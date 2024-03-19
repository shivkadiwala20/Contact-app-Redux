import React from "react";
import { getCurrentUser } from "../Storage/Storage";
import { Navigate, Outlet } from "react-router-dom";
import ContactPage from "../Pages/ContactPage/ContactPage";

const AuthRoutes = () => {
  const isUserLoggedIn = getCurrentUser();
  console.log({ isUserLoggedIn });

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <ContactPage />
      <Outlet />
    </>
  );
};

export default AuthRoutes;
