import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setMsg("Login successful!");
      else setMsg(data.detail || "Login failed");
      navigate("/persona", { state: { user: data.user } });
    } catch (err) {
      setMsg("Network error");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              type={showPwd ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPwd((show) => !show)}
                    >
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={loading}
              size="large"
              sx={{ fontWeight: "bold" }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Typography
              align="center"
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              Don&apos;t have an account?{" "}
              <Link to="/Signup">Signup</Link>
            </Typography>
            {msg && (
              <Alert severity={msg.includes("success") ? "success" : "error"}>
                {msg}
              </Alert>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
