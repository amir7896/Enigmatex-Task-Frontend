import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Tasks, NotFound } from "../views";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routing;
