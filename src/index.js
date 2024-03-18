import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SingUp from "./Pages/SignUp";
import ContactPage from "./Pages/ContactPage/ContactPage";
import { AddContact } from "./Pages/ContactPage/AddContact";
import ViewContact from "./Pages/ContactPage/ViewContact";
import { EditContact } from "./Pages/ContactPage/EditContact";
import Welcome from "./Components/Welcome";
import Protected from "./Components/Protected";
import Import from "./Components/Import";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SingUp />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <ContactPage />,
    children: [
      {
        path: "addcontact",
        element: <AddContact />,
      },
      {
        path: "viewcontact",
        element: <ViewContact />,
      },
      {
        path: "import",
        element: <Import />,
      },
      {
        path: "edit",
        element: <EditContact />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
