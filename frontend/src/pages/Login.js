import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Used for redirection

const API_BASE_URL = "http://localhost:5083/api/auth";

const Login = () => {
  const navigate = useNavigate(); // ✅ React Router navigation
  const [isSignup, setIsSignup] = useState(false); // Toggle login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // ✅ Full Name for Signup
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (isSignup) {
        // ✅ Step 1: First Register User
        const signupResponse = await axios.post(`${API_BASE_URL}/register`, {
          email,
          passwordHash: password,
          fullName, // ✅ Sending Full Name
        });

        if (signupResponse.status === 200) {
          // ✅ Step 2: Automatically Log in User after Signup
          const loginResponse = await axios.post(`${API_BASE_URL}/login`, {
            email,
            passwordHash: password,
          });

          if (loginResponse.data.token) {
            localStorage.setItem("token", loginResponse.data.token); // ✅ Save JWT token
            navigate("/post-job"); // ✅ Redirect to Post Job Page
          }
        }
      } else {
        // ✅ If it's a login request
        const loginResponse = await axios.post(`${API_BASE_URL}/login`, {
          email,
          passwordHash: password,
        });

        if (loginResponse.data.token) {
          localStorage.setItem("token", loginResponse.data.token);
          navigate("/post-job"); // ✅ Redirect after login
        }
      }

      setMessage({ type: "success", text: isSignup ? "Signup successful! Redirecting..." : "Login successful!" });

    } catch (error) {
      setMessage({ type: "error", text: error.response?.data || "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        sx={{
          width: "400px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Neighborly
        </Typography>
        <Typography variant="h6" gutterBottom>
          {isSignup ? "Sign Up" : "Login"}
        </Typography>

        {message && <Alert severity={message.type}>{message.text}</Alert>}

        <form onSubmit={handleAuth}>
          {isSignup && (
            <TextField 
              fullWidth 
              label="Full Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              margin="normal" 
              required 
            />
          )}
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            margin="normal" 
            required 
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            margin="normal" 
            required 
          />

          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }} 
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", mt: 2 }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
