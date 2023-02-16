import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.js";
import ImageCarousel from "./components/ImageCarousel.js";
import AddImageForm from "./components/AddImageForm.js";
import Login from "./components/Login.js";
import PrivateRoute from "./components/PrivateRoute.js";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <PrivateRoute
          path="/"
          element={<ImageCarousel />}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/add-image"
          element={<AddImageForm />}
          isAuthenticated={isAuthenticated}
        />
      </Routes>
    </Router>
  );
}

export default App;
