import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Signup successful!");
        navigate("/persona", { state: { user: data.user } });
      } else {
        setMsg(data.detail || "Signup failed");
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
        padding: { xs: 2, sm: 3 },
        margin: 0,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: { xs: 3, sm: 4 },
          borderRadius: 4,
          width: "100%",
          maxWidth: { xs: "96%", sm: 480 }, // balanced width for better proportion
          backgroundColor: "white",
          // subtle border for definition on bright screens
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.2,
              fontSize: { xs: "1.45rem", sm: "1.9rem" }, // slightly smaller for elegance
              lineHeight: 1.25,
              background: "linear-gradient(135deg, #5f6ee6 0%, #7a49a6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 0.5,
            }}
          >
            Get started with LifeSciences.
          </Typography>
          
        </Box>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={1.75}>
            {msg && (
              <Alert severity={msg.includes("success") ? "success" : "error"}>
                {msg}
              </Alert>
            )}

            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 0.75, fontWeight: 500, color: "#555" }}
              >
                Name
              </Typography>
              <TextField
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8f9fa",
                    "& fieldset": { borderColor: "#e7e7e7" },
                    "&:hover fieldset": { borderColor: "#667eea" },
                    "&.Mui-focused fieldset": { borderColor: "#667eea" },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 0.75, fontWeight: 500, color: "#555" }}
              >
                Email
              </Typography>
              <TextField
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8f9fa",
                    "& fieldset": { borderColor: "#e7e7e7" },
                    "&:hover fieldset": { borderColor: "#667eea" },
                    "&.Mui-focused fieldset": { borderColor: "#667eea" },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 0.75, fontWeight: 500, color: "#555" }}
              >
                Password
              </Typography>
              <TextField
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f8f9fa",
                    "& fieldset": { borderColor: "#e7e7e7" },
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
                mt: 0.25,
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
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.25)",
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Typography
              align="center"
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
