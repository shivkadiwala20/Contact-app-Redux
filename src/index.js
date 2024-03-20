import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SingUp from "./Pages/SignUp";
import ContactPage from "./Pages/ContactPage/ContactPage";
import { AddContact } from "./Pages/ContactPage/AddContact";
import ViewContact from "./Pages/ContactPage/ViewContact";
import { EditContact } from "./Pages/ContactPage/EditContact";

import Import from "./Components/Import";

const router = createBrowserRouter([
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
    element: <ContactPage />,

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
