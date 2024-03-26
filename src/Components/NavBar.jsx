import React, { useEffect } from "react";
import { Menu, MenuItem, Hidden } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCSVDownloader } from "react-papaparse";
import { useState } from "react";
import {
  getActiveUser,
  getCurrentUser,
  loggedOut,
  saveAddContactDetails,
} from "../Storage/Storage";

const exportData = () => {
  const contactData = getActiveUser();
  console.log("exportData", contactData);
  // setOpen(true);
  return contactData;
};

export function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { CSVDownloader } = useCSVDownloader();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  function logout() {
    loggedOut();
    navigate("/");
  }

  useEffect(() => {
    const data = getCurrentUser();
    // console.log("Home", data);
    if (data?.length > 0 || data !== null) {
      setUsername(data.email ? data.email.split("@")[0] : "");
    }
  }, []);

  return (
    <>
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
              <NavLink onClick={handleCloseMenu} to="/contacts/add-contact">
                <MenuItem color="inherit">Add Contact</MenuItem>
              </NavLink>
              <NavLink onClick={handleCloseMenu} to="/contacts/view-contact">
                <MenuItem>View Contact</MenuItem>
              </NavLink>
              <NavLink onClick={handleCloseMenu} to="/contacts/import">
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
            <NavLink to="/contacts/add-contact" className="navLink">
              <Button color="inherit">Add Contact</Button>
            </NavLink>
            <NavLink to="/contacts/view-contact" className="navLink">
              <Button color="inherit">View Contact</Button>
            </NavLink>
            <NavLink to="/contacts/import" className="navLink">
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
    </>
  );
}
