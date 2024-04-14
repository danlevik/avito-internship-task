import * as React from "react";
import { FilmsList } from "./pages/FilmsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Film } from "./pages/Film";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<FilmsList />} />
          <Route path="/movie/:id" element={<Film />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
