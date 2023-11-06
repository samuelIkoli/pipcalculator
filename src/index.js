import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Pip from './Pip';
import Fastpip from './Fastpip';
import ERPip from './ERpip';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Pip />
    ),
  },
  {
    path: "fastpip",
    element: <Fastpip />,
  },
  {
    path: "erpip",
    element: <ERPip />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


