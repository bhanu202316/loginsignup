import React, { useState } from "react";
import { Container, Paper, TextField, Button, Alert, Typography, Box } from "@mui/material";
import { Link,useNavigate } from "react-router-dom"; 

export default function Signup() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "",
    gender: "",
    status: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ 
      ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) setMsg("Signup successful!");
    else setMsg(data.detail || "Signup failed");
    navigate("/persona", { state: { user: data.user } });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Signup</Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField name="id" label="ID" value={form.id} onChange={handleChange} required />
            <TextField name="name" label="Name" value={form.name} onChange={handleChange} required />
            <TextField name="department" label="Department" value={form.department} onChange={handleChange} required />
            <TextField name="gender" label="Gender" value={form.gender} onChange={handleChange} required />
            <TextField name="status" label="Status" value={form.status} onChange={handleChange} required />
            <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
            <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
            <Button variant="contained" type="submit" fullWidth>Sign Up</Button>
            <Typography
              align="center"
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </Typography>
            {msg && <Alert severity={msg.includes("success") ? "success" : "error"}>{msg}</Alert>}
           
          </Box>
        </form>
      </Paper>
    </Container>
  );
}