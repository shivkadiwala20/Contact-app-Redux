import React, { useState, forwardRef } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../Storage/Storage";
import { getActiveUser, setContactInStorage } from "../Storage/Storage";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Import() {
  const navigate = useNavigate();
  const sessionData = getCurrentUser();
  const activeUser = sessionData.userId !== null ? sessionData.userId : null;
  const vertical = "top";
  const horizontal = "right";
  const [open, setOpen] = useState(false);
  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      complete: function (result) {
        const data = [];
        result.data.map((d) => {
          return data.push({
            name: d[2],
            email: d[1],
            phone: d[0],
            Avatar: d[3],
            userId: d[4],
          });
        });
        data.shift();
        const contacts = getActiveUser([activeUser]);
        data.map((d) => {
          return contacts.push(d);
        });
        setContactInStorage([activeUser], contacts);
        setOpen(true);
        navigate("/home/view-contact");
      },
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

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
          Contact Imported SuccessFully!!
        </Alert>
      </Snackbar>
      <div
        className="App"
        style={{
          textAlign: "center",
          marginTop: "200px",
          // border: "2px solid",
        }}
      >
        <h1>
          Please upload the <span className="csv">.CSV</span> file to import
          Contacts
        </h1>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={handleFile}
        ></input>
      </div>
    </>
  );
}
