import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import { Navbar } from "../ContactPage/ContactNavbar";
import "../../index.css";
// import "../ContactPage/navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Navbar } from "./ContactNavbar";
import { getCurrentUser } from "../../Storage/Storage";
import { useEffect } from "react";
import { Menu, MenuItem, Hidden } from "@mui/material";
import { useCSVDownloader } from "react-papaparse";
import MenuIcon from "@mui/icons-material/Menu";

export default function ContactPage() {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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

  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem("formData");
    navigate("/login");
  }

  // const location = useLocation();

  // const userDetails = location.state
  //   ? location.state.email.split("@")[0]
  //   : null;
  // const username = userDetails;

  const [username, setUsername] = useState("");

  useEffect(() => {
    const data = getCurrentUser();
    console.log("contactPage", data);
    if (data) {
      setUsername(data.email.split("@")[0]);
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
    console.log("activeUser", activeUser);
    const contactData = JSON.parse(localStorage.getItem(activeUser)) ?? [];
    console.log("exportData", contactData);
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
          You have successfully logged in!
        </Alert>
      </Snackbar>

      {/* <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hello {username} , Welcome To Contact App
            </Typography>
            <Button color="inherit" onClick={logout}>
              LogOut
            </Button>
          </Toolbar>
        </AppBar>
      </Box> */}
      {/* <Stack spacing={2} direction="row" className="buttons">
        <Button variant="contained">Add Contact</Button>
      </Stack> */}
      {/* <Navbar /> */}

      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Hello {username} , Welcome To Contact App
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
              <MenuItem>Import Contact</MenuItem>
              <MenuItem onClick={exportData}>Export Contact</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Hidden>
          <Hidden smDown>
            <NavLink to="/home/addcontact" className="navLink">
              <Button color="inherit">Add Contact</Button>
            </NavLink>
            <NavLink to="/home/viewcontact" className="navLink">
              <Button color="inherit">View Contact</Button>
            </NavLink>
            <Button color="inherit">Import Contact</Button>
            <CSVDownloader
              className="export-btn"
              // type={Type.Button}
              bom={true}
              filename={"JSON-TO-CSV"}
              delimiter={";"}
              data={exportData}
            >
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
