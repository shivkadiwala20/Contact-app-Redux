import React from "react";
import { getCurrentUser } from "../Storage/Storage";
import { Navigate, Outlet } from "react-router-dom";
import Home from "../Pages/Home/Home";

const ProtectedRoutes = () => {
  const isUserLoggedIn = getCurrentUser();
  console.log({ isUserLoggedIn });

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Home />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
