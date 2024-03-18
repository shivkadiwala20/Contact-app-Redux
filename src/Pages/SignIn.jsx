import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/weblogo.svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, forwardRef, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getCurrentUser,
  getFormDataFromLocalStorage,
  setCurrentUser,
} from "../Storage/Storage";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    password: yup.string().min(8).required(),

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
  left: "37%",
};

function SignIn() {
  const [open, setOpen] = useState(false);

  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // function getUserId() {
  //   return Math.floor(100000 + Math.random() * 900000);
  // }

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Data from SignIn", JSON.stringify(data));
    const storedFormData = getFormDataFromLocalStorage();

    const isUserExists = storedFormData.some((user) => {
      console.warn(data.email === user.email);
      return user.email === data.email;
    });

    console.log("datauserId", data);

    // const getSessionData = getCurrentUser();
    // console.log("getSeesionData", getSessionData);
    if (!isUserExists) {
      setError("root", {
        message: "User Does Not Exist Please Register First",
      });
    }
    // setCurrentUser(storedFormData);
    for (let val of storedFormData) {
      if (val.email === data.email) {
        console.log("firstIf");
        if (val.password !== data.password) {
          setError("root", {
            message: "Credentials Does Not Match",
          });
        } else {
          console.log("Credential match");
          console.log("vvv", val.userId);
          // const sessionData = setCurrentUser({ ...data, userId: val.userId });
          sessionStorage.setItem("activeUserId", JSON.stringify(val));

          setOpen(true);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
          break;
        }
      }
    }
    // console.log(newData);
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
          You have successfully logged in!
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
            <Grid
              item
              xs={12}
              sm={12}
              lg={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "18px",
                  // marginLeft: "150px",
                  // marginRight: "15px",
                  marginBottom: "25px",
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
                    <Box height={35} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#ffffff",
                        }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Sign In
                      </Typography>

                      {errors.root && (
                        <Typography
                          sx={{ color: "Yellow", textAlign: "center" }}
                        >
                          {errors.root.message}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ mt: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
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
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
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

                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth={true}
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "rgb(76,82,86)",
                              disabled: { isSubmitting },
                            }}
                          >
                            {isSubmitting ? "SIGN IN...." : "SIGN IN"}
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Not registered yet?{" "}
                              <span
                                style={{
                                  color: "rgb(76,82,86)",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate("/");
                                }}
                              >
                                Create an Account
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

export default SignIn;
