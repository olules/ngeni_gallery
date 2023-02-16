import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Gallery, GalleryImage } from "react-gesture-gallery";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
  },
}));

const ImageCarousel = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("http://localhost:5000/api/images");
      const data = await res.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  const handleIndexChange = (index) => {
    setIndex(index);
  };

  return (
    <div className={classes.root}>
      <Gallery
        index={index}
        onRequestChange={handleIndexChange}
        enableKeyboardControls={true}
        enableMouseControls={true}
      >
        {images.map((image) => (
          <GalleryImage
            key={image._id}
            objectFit="contain"
            src={`data:${image.contentType};base64,${image.imageData}`}
            alt={image.title}
            style={{ margin: 200 }}
          />
        ))}
      </Gallery>
    </div>
  );
};

export default ImageCarousel;
