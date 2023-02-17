//AddImageForm.js
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
    // marginBottom: 50,
  },
  button: {
    //margin: 50,
  },
}));

const AddImageForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("img", img);
  formData.append("title", title);
  formData.append("desc", desc);

  fetch("http://localhost:5000/api/images", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        setTitle("");
        setDesc("");
        setImg(null);
        navigate("/", { replace: true });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


  return (
    <Container
      style={{
        width: "30%",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: 80,
        padding: 20,
      }}
    >
      <Box style={{ width: "100%" }} mt={10}>
        <Typography
          style={{ textAlign: "center", fontSize: 32, fontWeight: 2 }}
          variant="h4"
        >
          Add an Image
        </Typography>
      </Box>
      <form
        onSubmit={handleSubmit}
        className={classes.formContainer}
        encType="multipart/form-data"
      >
        <Box mt={2} width="100%">
          <TextField
            fullWidth
            label="Title"
            value={title}
            variant="outlined"
            color="primary"
            onChange={handleTitleChange}
            style={{ borderColor: "#ccc", marginBottom: 20 }}
          />
        </Box>
        <Box mt={2} width="100%">
          <TextField
            fullWidth
            label="Description"
            value={desc}
            variant="outlined"
            color="primary"
            onChange={handleDescChange}
            style={{ marginBottom: 20 }}
          />
        </Box>
        <Box mt={2} width="100%">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="contained-button-file"
            className={classes.input}
            //value={img}
          />
          <label htmlFor="contained-button-file">
            <Button
              style={{ marginBottom: 20 }}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </label>
        </Box>
        <Box mt={2} width="100%">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!title || !desc || !img}
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
