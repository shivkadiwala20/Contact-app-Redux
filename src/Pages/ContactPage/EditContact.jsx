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
import { useLocation, useNavigate } from "react-router-dom";
import {
  editContact,
  getCurrentUser,
  saveAddContactDetails,
  setContactInStorage,
} from "../../Storage/Storage";
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

export function EditContact() {
  // const getData = getAddContactDetails();
  // const editedData = getData.find((val) => {
  //   console.log("EditContactData", val.userId);
  //   return val;
  // });
  //   console.log("EditContactData", editedData);
  const location = useLocation();
  const sessionData = getCurrentUser();
  const activeUser = sessionData.userId;
  // console.log("activeeeUSerrrr", activeUser);
  const userId = location.state ? location.state : null;
  console.log("Id", userId);
  const editedData = editContact([activeUser]);
  console.log("updatedContactData", editedData);
  const editedContact = editedData.find((val) => val.userId === userId);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: editedContact.name,
      email: editedContact.email,
      phone: editedContact.phone,
    },
  });

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  function getUserId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const onSubmit = (contactData) => {
    const existingData = Object.keys(editedContact)
      .filter((objKey) => objKey !== "userId")
      .reduce((newObj, key) => {
        newObj[key] = editedContact[key];
        return newObj;
      }, {});

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // console.log(reader.result);
      contactData.Avatar = reader.result;
      getAddContactDetails(contactData);
      const newData = saveAddContactDetails({
        ...contactData,
        userId: getUserId(),
      });

      if (JSON.stringify(existingData) !== JSON.stringify(contactData)) {
        existingData.name = contactData.name;
        existingData.number = contactData.number;
        existingData.email = contactData.email;
        existingData.avatar = contactData.avatar;
        existingData.userId = editedContact.userId;
        const editedData = editContact([activeUser]);
        const indexToUpdate = editedData.findIndex(
          (obj) => obj.userId === editedContact.userId
        );
        editedData[indexToUpdate] = existingData;
        setContactInStorage([activeUser], editedData);

        console.log("index", editedData);
      }

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
            >
              Update Contact
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0.5, mb: 2 }}
            >
              Reset Contact
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
