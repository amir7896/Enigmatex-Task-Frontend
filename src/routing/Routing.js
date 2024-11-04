import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Tasks } from "../views";
import React from "react";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tasks />} />
      </Routes>
    </Router>
  );
};

export default Routing;
