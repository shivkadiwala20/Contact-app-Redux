import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState, forwardRef } from "react";
import "../ContactPage/AddContact.css";
import { useNavigate } from "react-router-dom";
import { saveAddContactDetails } from "../../Storage/Storage";
import { getAddContactDetails } from "../../Storage/Storage";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const defaultTheme = createTheme();
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Please enter a valid 10 digit phone number"),
  })
  .required();

export function AddContact() {
  const vertical = "top";
  const horizontal = "right";
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  function getUserId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const onSubmit = async (contactData) => {
    // console.log(contactData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // const sessionData = getCurrentUser();
    // console.log("SessionData", sessionData.userId);
    // saveAddContactDetails(contactData);

    if (image) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // console.log(reader.result);
        contactData.Avatar = reader.result;
        getAddContactDetails(contactData);
        saveAddContactDetails({
          ...contactData,
          userId: getUserId(),
        });
      });
      reader.readAsDataURL(image);
      contactData.Avatar = image;
      setOpen(true);
      setTimeout(() => {
        navigate("/home/view-contact");
      }, 1000);
    } else {
      contactData.Avatar = " ";
      getAddContactDetails(contactData);
      saveAddContactDetails({
        ...contactData,
        userId: getUserId(),
      });
      setOpen(true);
      setTimeout(() => {
        navigate("/home/view-contact");
      }, 1000);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
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
          Contact Added SuccessFully!!
        </Alert>
      </Snackbar>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, width: 86, height: 86 }}
              onClick={handleClick}
              src={
                image
                  ? URL.createObjectURL(image)
                  : require("../bg/456322.webp")
              }
            />
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              accept="image/png, image/gif, image/jpeg"
              style={{ display: "none" }}
            />
            <Typography component="h1" variant="h5">
              Upload Image
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                {...register("name")}
              />
              {errors.name && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errors.name?.message}
                </span>
              )}
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                name="email"
                {...register("email")}
              />
              {errors.email && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errors.email?.message}
                </span>
              )}

              <TextField
                {...register("phone", {
                  required: "requried",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "please enter valid pohone",
                  },
                })}
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone Number"
                // type="tel"
                id="phone"
              />
              {errors.phone && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errors.phone?.message}
                </span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Contact"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
