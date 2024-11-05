import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Tasks, NotFound, Products, ProductForm } from "../views";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/products" element={<Products />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routing;
