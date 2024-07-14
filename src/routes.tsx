import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FibonacciPage from "./pages/Fibonacci";
import CollatzPage from "./pages/CollatzConjecture";
import ListItemPage from "./pages/ListItemPage";
import Navbar from "./components/Navbar";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/list-item" />} />
        <Route path="/list-item" element={<ListItemPage />} />
        <Route path="/fibonacci" element={<FibonacciPage />} />
        <Route path="/collatz" element={<CollatzPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
