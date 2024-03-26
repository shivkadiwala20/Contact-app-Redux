import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { contactReducer } from "../src/Reducers/Reducer";
import AppRouting from "./AppRouting";

const store = createStore(contactReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={AppRouting} />
    </Provider>
  </React.StrictMode>
);
