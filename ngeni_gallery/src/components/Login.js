import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../store/actions/login.js";
import {Card, CardContent, TextField, Button, Typography   }from "@material-ui/core";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser(signupUsername, signupPassword));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card
        style={{ width: "50%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <CardContent>
          <Typography
            variant="h5"
            style={{ textAlign: "center", marginBottom: 20 }}
          >
            {showSignup ? "Sign up" : "Login"}
          </Typography>
          {showSignup ? (
            <form onSubmit={handleSignup}>
              <TextField
                label="Username"
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginBottom: 20 }}
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginBottom: 20 }}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                Signup
              </Button>
              <Button
                onClick={() => setShowSignup(false)}
                style={{ marginLeft: "10px" }}
              >
                Login instead
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginBottom: 20 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginBottom: 20 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
              <Button
                onClick={() => setShowSignup(true)}
                style={{ marginLeft: "10px" }}
              >
                Sign up instead
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
