import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.js";
import ImageCarousel from "./components/ImageCarousel.js";
import AddImageForm from "./components/AddImageForm.js";
import Login from "./components/Login.js";
import PrivateRoute from "./components/PrivateRoute.js";
import { useSelector } from "react-redux";
import store from "./store/configureStore.js";
import { Provider } from "react-redux";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <ImageCarousel />
            </PrivateRoute>
          }
        >
           <Route path="/add-image" element={<AddImageForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default function () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
