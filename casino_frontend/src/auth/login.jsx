import React, { useState } from "react";
import {
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
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ name: "", password: "" });
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
      if (res.ok) {
        setMsg("Login successful!");
        navigate("/persona", { state: { user: data.user } });
      } else {
        setMsg(data.detail || "Login failed");
      }
    } catch (err) {
      setMsg("Network error");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden", // prevents scrolling
        margin: 0,
        padding: 0,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: { xs: 3, sm: 4 },
          borderRadius: 4,
          width: "100%",
          maxWidth: 420, // fixed max width
          backgroundColor: "white",
          boxSizing: "border-box", // ensures padding doesn't add extra space
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "2rem" },
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to LifeSciences
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            {msg && (
              <Alert severity={msg.includes("success") ? "success" : "error"}>
                {msg}
              </Alert>
            )}

            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 500, color: "#555" }}
              >
                Name
              </Typography>
              <TextField
                name="name"
                placeholder="Enter your name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8f9fa",
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&:hover fieldset": { borderColor: "#667eea" },
                    "&.Mui-focused fieldset": { borderColor: "#667eea" },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 500, color: "#555" }}
              >
                Password
              </Typography>
              <TextField
                name="password"
                placeholder="Password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8f9fa",
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&:hover fieldset": { borderColor: "#667eea" },
                    "&.Mui-focused fieldset": { borderColor: "#667eea" },
                  },
                }}
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
            </Box>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              size="large"
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                padding: "12px",
                borderRadius: 2,
                textTransform: "none",
                background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #5568d3 0%, #6a3f8f 100%)",
                },
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>

            <Typography
              align="center"
              variant="body2"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Signup
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
