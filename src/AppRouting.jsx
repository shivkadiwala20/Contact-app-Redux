import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/ContactPage/Home";
import SingUp from "./Pages/SignUp";
import { AddContact } from "./Pages/ContactPage/AddContact";
import Import from "./Components/Import";
import { EditContact } from "./Pages/ContactPage/EditContact";
import SignIn from "./Pages/SignIn";
import ViewContact from "./Pages/ContactPage/ViewContact";
const AppRouting = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SingUp />,
  },
  {
    path: "/contacts",
    element: <Home />,

    children: [
      {
        path: "add-contact",
        element: <AddContact />,
      },
      {
        path: "view-contact",
        element: <ViewContact />,
      },
      {
        path: "import",
        element: <Import />,
      },
      {
        path: "edit/:userId",
        element: <EditContact />,
      },
    ],
  },
]);

export default AppRouting;
