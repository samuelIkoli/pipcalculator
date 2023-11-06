import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter, createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Pip from './Pip';
import Fastpip from './Fastpip';

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
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


