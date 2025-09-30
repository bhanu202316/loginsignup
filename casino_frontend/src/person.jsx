import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Persona() {
  // Get user object (with persona) from navigation state
  const location = useLocation();
  const user = location.state?.user;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to life sciences Ai
        </Typography>
        <Typography variant="h6" align="center">
          {user?.persona ? user.persona : "No persona found"}
        </Typography>
      </Paper>
    </Container>
  );
}
