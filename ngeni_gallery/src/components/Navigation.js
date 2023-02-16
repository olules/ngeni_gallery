import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ngeni Gallery
        </Typography>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" style={{ marginRight: 20 }}>
            Gallery
          </Typography>
        </Link>
        <Link to="/addImage" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6">Add Image</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
