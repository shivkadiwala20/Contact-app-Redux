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
import { useRef, useState } from "react";
import "../ContactPage/AddContact.css";
import { useNavigate } from "react-router-dom";
import { saveAddContactDetails } from "../../Storage/Storage";
import { getAddContactDetails } from "../../Storage/Storage";
const defaultTheme = createTheme();

const schema = yup

  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required(),
    phone: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10, "Phone number must be equal to 10")
      .required("A phone number is required"),
  })
  .required();

export function AddContact() {
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

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // console.log(reader.result);
      contactData.Avatar = reader.result;
      getAddContactDetails(contactData);
      const newData = saveAddContactDetails({
        ...contactData,
        userId: getUserId(),
      });
      navigate("/home/viewcontact");
      console.log(newData);
    });
    reader.readAsDataURL(image);
    console.log("CotactData", contactData);

    contactData.Avatar = image;

    // saveAddContactDetails(contactData);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   console.log(reader.result);
    // });
    // reader.readAsDataURL(file);
  };

  return (
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
          <Avatar sx={{ m: 1, width: 86, height: 86 }} onClick={handleClick}>
            {/* <Avatar alt="Shiv" src="/static/images/avatar/1.jpg" /> */}
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                className="image-display-after "
                alt="shiv-img"
              />
            ) : (
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256"
                alt=""
                className="image-display-before "
              />
            )}
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </Avatar>
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
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              type="tel"
              id="phone"
              {...register("phone")}
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
  );
}
