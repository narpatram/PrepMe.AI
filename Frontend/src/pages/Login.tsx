import { useState } from "react";
import { useMutation } from "@tanstack/react-query"; // Ensure correct import
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { api, setAuthToken } from "../services/apis";
import { useNavigate } from "react-router-dom";

// Define expected API response type
interface LoginResponse {
  access_token: string;
}

// Define expected request payload type
interface LoginPayload {
  username: string;
  password: string;
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const loginMutation = useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (credentials: LoginPayload): Promise<LoginResponse> => {
      const response = await api.post<LoginResponse>("/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      setAuthToken(data.access_token);
      navigate("/"); // Redirect to home after successful login
    },
  });

  const handleLogin = async () => {
    setError(null);
    try {
      const data = await loginMutation.mutateAsync({ username, password });
      setAuthToken(data.access_token);
      localStorage.setItem("token", data.access_token); // Store token in localStorage
      navigate("/"); // Redirect to home after successful login
    } catch (error) {
      setError("Invalid username or password.");
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom color="primary">
          Login to PrepMe.Ai
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>
    </Container>
  );
}
