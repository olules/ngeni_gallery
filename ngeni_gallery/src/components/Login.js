import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../store/actions/login.js";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser(signupEmail, signupPassword));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{ width: "50%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)" }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </form>
          {showSignup ? (
            <form onSubmit={handleSignup}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Signup
              </Button>
            </form>
          ) : (
            <Button fullWidth onClick={() => setShowSignup(true)}>
              Sign up instead
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
