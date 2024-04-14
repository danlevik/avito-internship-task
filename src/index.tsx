import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.scss";

import { BrowserRouter, Routes, createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { FilmsList } from "./pages/FilmsList";
import { Film } from "./pages/Film";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilmsList />,
  },
  {
    path: "movie/:id",
    element: <Film />,
  },
]);

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <App />
);
