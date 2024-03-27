import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Import from './components/Import';
import ProtectedRoutes from './components/ProtectedRoutes';
import { AddContact } from './pages/contact-page/AddContact';
import { EditContact } from './pages/contact-page/EditContact';
import Home from './pages/contact-page/Home';
import ViewContact from './pages/contact-page/ViewContact';
import SignIn from './pages/SignIn';
import SingUp from './pages/SignUp';
const AppRouting = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SingUp />,
  },
  {
    path: '/contacts',
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: 'add-contact',
        element: <AddContact />,
      },
      {
        path: 'view-contact',
        element: <ViewContact />,
      },
      {
        path: 'import',
        element: <Import />,
      },
      {
        path: 'edit/:userId',
        element: <EditContact />,
      },
    ],
  },
]);

export default AppRouting;
