import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { deleteContact, getAddContactDetails } from "../../Storage/Storage";
import Avatar from "@mui/material/Avatar";
import "../ContactPage/ViewContact.css";
import { forwardRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import ContactsIcon from "@mui/icons-material/Contacts";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewContact() {
  const vertical = "top";
  const horizontal = "right";
  const [open, setOpen] = React.useState(false);
  const getData = getAddContactDetails();
  const [, setRows] = React.useState(getData);

  const handleDelete = (userId) => {
    deleteContact(userId);
    setRows(getAddContactDetails());
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleEdit = (userId) => {
    navigate("/home/edit", {
      state: userId,
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
          Contact Deleted SuccessFully!!
        </Alert>
      </Snackbar>

      {getData.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "200px",
            // border: "2px solid",
          }}
        >
          <h1>No contacts found, Please add contacts.</h1>
          <Button
            variant="contained"
            onClick={() => navigate("/home/add-contact")}
          >
            <ContactsIcon sx={{ mr: 2 }} />
            Add Contact
          </Button>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, mt: 3 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Action&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getData.map((row) => (
                <StyledTableRow key={row.userId}>
                  <StyledTableCell component="th" scope="row">
                    <Avatar src={row.Avatar} alt={row.name[0]} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.phone}</StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon
                      sx={{ mr: 2, cursor: "pointer" }}
                      onClick={() => handleEdit(row.userId)}
                    />
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleDelete(row.userId)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
