import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function TopBar({ user, setUser }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetch('http://localhost:8080/users/logout', { method: 'POST' });
    setUser(null);
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
              Photo Sharing App
            </Link>
          </Typography>
        </Box>
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="subtitle1" component="div">
              <Link to={`/users/${user._id}`} style={{ textDecoration: "none", color: "#333" }}>
                Hi, {user.first_name} {user.last_name}
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ ml: 2, textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="subtitle1" color="text.secondary">
            Please Login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;