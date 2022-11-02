import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import OneArticle from "./OneArticle";
import "./style.css";

function RouteSwitch() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/article/:id" element={<OneArticle />} />
      </Routes>
    </HashRouter>
  );
}

export default RouteSwitch;
