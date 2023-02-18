import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import { Buffer } from "buffer";
import axios from "axios";

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
     await axios
       .get("http://localhost:5000/api/images")
       .then((res) => {
         console.log(res.data); // add this line to log the images data
         setImages(res.data);
       })
       .catch((error) => console.log(error.message));
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
        {images &&
          images.map((image) => {
            return (
              <GalleryImage
                key={image.title}
                objectFit="contain"
                src={image.img} // decode base64-encoded string of image data
                alt={image.title}
                style={{}}
              />
            );
          })}
      </Gallery>
    </div>
  );
};

export default ImageCarousel;
