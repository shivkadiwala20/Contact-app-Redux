import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NavLink, Outlet } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import { Navbar } from "../ContactPage/ContactNavbar";
import "../../index.css";
import { getCurrentUser } from "../../Storage/Storage";
import { useEffect } from "react";
import { Menu, MenuItem, Hidden } from "@mui/material";
import { useCSVDownloader } from "react-papaparse";
import MenuIcon from "@mui/icons-material/Menu";

export default function ContactPage() {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("activeUserId")) {
      navigate("login");
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

  function logout() {
    sessionStorage.removeItem("activeUserId");
    navigate("/login");
  }

  const [username, setUsername] = useState("");
  useEffect(() => {
    const data = getCurrentUser();
    // console.log("contactPage", data);
    if (data?.length > 0 || data !== null) {
      setUsername(data.email ? data.email.split("@")[0] : "");
    }
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const exportData = () => {
    const sessionData = getCurrentUser();
    const activeUser = sessionData.userId !== null ? sessionData.userId : null;
    // console.log("activeUser", activeUser);
    const contactData = JSON.parse(localStorage.getItem([activeUser])) ?? [];
    // console.log("exportData", contactData);
    // setOpen(true);
    return contactData;
  };

  const { CSVDownloader } = useCSVDownloader();
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
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Welcome {username} !!
          </Typography>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <NavLink to="/home/addcontact">
                <MenuItem color="inherit">Add Contact</MenuItem>
              </NavLink>
              <NavLink to="/home/viewcontact">
                <MenuItem>View Contact</MenuItem>
              </NavLink>
              <NavLink to="/home/import">
                <MenuItem>Import Contact</MenuItem>
              </NavLink>
              <CSVDownloader
                className="export-btn"
                // type={Type.Button}
                bom={true}
                filename={"EXPORTED-DATA"}
                delimiter={";"}
                data={exportData}
              >
                <MenuItem onClick={exportData}>Export Contact</MenuItem>
              </CSVDownloader>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Hidden>
          <Hidden mdDown>
            <NavLink to="/home/addcontact" className="navLink">
              <Button color="inherit">Add Contact</Button>
            </NavLink>
            <NavLink to="/home/viewcontact" className="navLink">
              <Button color="inherit">View Contact</Button>
            </NavLink>
            <NavLink to="/home/import" className="navLink">
              <Button color="inherit">Import Contact</Button>
            </NavLink>
            <CSVDownloader
              className="export-btn"
              // type={Type.Button}
              bom={true}
              filename={"EXPORTED-DATA"}
              delimiter={";"}
              data={exportData}
            >
              {/* <FileUploadIcon sx={{}} /> */}
              <Button color="inherit" onClick={exportData}>
                Export Contact
              </Button>
            </CSVDownloader>

            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Hidden>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          ></IconButton>
        </Toolbar>
      </AppBar>
      <Outlet></Outlet>
    </>
  );
}
