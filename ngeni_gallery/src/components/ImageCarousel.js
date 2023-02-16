import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Gallery, GalleryImage } from "react-gesture-gallery";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
  },
}));

const ImageCarousel = ({ images }) => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handleIndexChange = React.useCallback((index) => {
    setIndex(index);
  }, []);

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
            src={`/api/images/${image.imageUrl}`}
            alt={image.title}
          />
        ))}
      </Gallery>
    </div>
  );
};

export default ImageCarousel;
