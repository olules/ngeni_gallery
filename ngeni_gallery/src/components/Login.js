import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../store/actions/login.js";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {showSignup ? (
        <form onSubmit={handleSignup}>
          <label>
            Email:
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </label>
          <button type="submit">Signup</button>
        </form>
      ) : (
        <button onClick={() => setShowSignup(true)}>Sign up instead</button>
      )}
    </div>
  );
};

export default Login;
