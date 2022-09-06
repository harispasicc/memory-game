import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Modal from "./components/Modal";
import Game from "./components/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Game />} />
        <Route path="/modal" exact element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
