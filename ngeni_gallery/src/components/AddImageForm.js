import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addImage } from "../store/actions/images.js";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));

const AddImageForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    dispatch(addImage(formData));

    setTitle("");
    setDescription("");
    setImage(null);

    navigate("/", { replace: true });
  };

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h4">Add Image</Typography>
      </Box>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <Box mt={2} width="100%">
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </Box>
        <Box mt={2} width="100%">
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Box mt={2} width="100%">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="contained-button-file"
            className={classes.input}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </Box>
        <Box mt={2} width="100%">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!title || !description || !image}
            className={classes.button}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddImageForm;
