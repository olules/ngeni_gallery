import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.js";
import ImageCarousel from "./components/ImageCarousel.js";
import AddImageForm from "./components/AddImageForm.js";
import ErrorBoundary from './components/ErrorBoundary.js'

function App() {
  const [images, setImages] = useState([]);

  const addImage = (newImage) => {
    setImages([...images, newImage]);
  };

  return (
    <ErrorBoundary>
      <Navigation />
      <Routes>
        <Route path="/add-image">
          <AddImageForm onAddImage={addImage} />
        </Route>

        <Route path="/">
          <ImageCarousel
            images={[
              {
                _id: 1,
                imageUrl: "https://picsum.photos/200/300",
                title: "Image 1",
              },
              {
                _id: 2,
                imageUrl: "https://dummyimage.com/600x400/000/fff",
                title: "Image 2",
              },
            ]}
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
