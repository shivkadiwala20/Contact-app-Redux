import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useState, forwardRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../index.css";
import { getCurrentUser } from "../../Storage/Storage";
import { useEffect } from "react";
import { NavBar } from "../../Components/NavBar";

export default function Home() {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();
  useEffect(() => {
    const isUserLoggedIn = getCurrentUser();

    if (!isUserLoggedIn) {
      navigate("/");
    } else {
      navigate("/contacts/view-contact");
    }
  }, [navigate]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(true);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Contact Exported Successfully !!
        </Alert>
      </Snackbar>
      <NavBar />
      <Outlet />
    </>
  );
}
