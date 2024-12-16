// Import dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import ListB from "./listB";
import ListA from "./listA";

const App = () => (
  <Router>
    <Container>
      <Routes>
        <Route path="/" element={<ListA />} />
        <Route path="/tutorial/:id/comments" element={<ListB />} />
        <Route
          path="/home"
          element={<h1>Welcome to the Project Management App</h1>}
        />
      </Routes>
    </Container>
  </Router>
);

export default App;
