import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/weblogo.svg";
// import bgimg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { Form, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  saveFormDataToLocalStorage,
  getFormDataFromLocalStorage,
} from "../Storage/Storage";
const schema = yup
  .object({
    // username: yup.string().min(3).max(10).required(),
    password: yup.string().min(8).required(),
    confirmpassword: yup
      .string()
      .label("confirm password")
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    email: yup.string().email().required(),
  })
  .required();

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "30%",
};

export default function SingUp() {
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  function getUserId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const onSubmit = (formData) => {
    console.log(formData);

    const { confirmpassword, ...formDataWithoutConfirm } = formData;

    saveFormDataToLocalStorage({
      ...formDataWithoutConfirm,
      userId: getUserId(),
    });

    const storedFormData = getFormDataFromLocalStorage();
    console.log("Stored Form Data:", storedFormData);

    setOpen(true);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
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
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User Registered Successfully !!
        </Alert>
      </Snackbar>
      <div
        style={{
          // backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "140px",
                  marginLeft: "150px",
                  marginRight: "15px",
                  height: "200px",
                  width: "205px",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "rgb(33,170,233)",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={25} />
                    <Box sx={center}>
                      <Typography component="h1" variant="h4">
                        Create Account
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            size="small"
                            {...register("email")}
                          />
                          {errors.email && (
                            <span style={{ color: "yellow", fontSize: "18px" }}>
                              {errors.email?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            {...register("password")}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            size="small"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.password && (
                            <span style={{ color: "yellow", fontSize: "18px" }}>
                              {errors.password?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            {...register("confirmpassword")}
                            name="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            size="small"
                            id="confirmpassword"
                            autoComplete="new-password"
                          />

                          <span style={{ color: "yellow", fontSize: "18px" }}>
                            {errors.confirmpassword?.message}
                          </span>
                        </Grid>

                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth="true"
                            size="large"
                            sx={{
                              mt: "15px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "rgb(76,82,86)",
                            }}
                          >
                            Register
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Already have an Account?{" "}
                              <span
                                style={{
                                  color: "rgb(76,82,86)",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate("/login");
                                }}
                              >
                                Sign In
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </form>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
