import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { getCurrentUser } from "../Storage/Storage";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  const sessionData = getCurrentUser();
  const activeUser = sessionData.userId;
  // console.log("loginv", activeUser);
  // if (!activeUser) {
  //   navigate("login");
  // }

  return <div>{!activeUser ? <Navigate to="login" /> : <Component />}</div>;
};

export default Protected;
