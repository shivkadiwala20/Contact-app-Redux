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
import { useEffect, forwardRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { Box, Modal } from "@mui/material";
// import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

// function createData(Avatar, name, email, phone) {
//   return { Avatar, name, email, phone };
// }
// const getData = getAddContactDetails();
// getData.forEach((element) => {
//   console.log("elem", element.Avatar);
//   createData(element.Avatar);
// });

// const rows = [];

export default function ViewContact() {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const vertical = "top";
  const horizontal = "right";
  const [open, setOpen] = React.useState(false);
  const getData = getAddContactDetails();
  const [, setRows] = React.useState(getData);
  useEffect(() => {
    setRows(getData.map((elem) => console.log("shivv", elem)));
  }, []);

  const handleDelete = (userId) => {
    deleteContact(userId);
    setRows(getAddContactDetails());
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleEdit = (userId) => {
    // alert("hi");
    // editContact(userId);
    // <Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box sx={styled}>
    //     <Typography id="modal-modal-title" variant="h6" component="h2">
    //       Text in a modal
    //     </Typography>
    //     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //     </Typography>
    //   </Box>
    // </Modal>;

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
            {console.warn({ getData })}
            {getData.map((row) => (
              <StyledTableRow key={row.userId}>
                <StyledTableCell component="th" scope="row">
                  {/* <Avatar alt={row.name} src={row.Avatar} /> : */}
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
    </>
  );
}
