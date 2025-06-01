import './App.css';
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from './components/LoginRegister';

function Home({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user && window.location.pathname === '/login') {
      navigate(`/users/${user._id}`);
    }
  }, [user, navigate]);


  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar user={user} setUser={setUser} navigate={navigate} />
        </Grid>
        <div className="main-topbar-buffer" />
        <Grid item sm={3}>
          <Paper className="main-grid-item">
            <UserList user={user} />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Routes>
              <Route path="/login" element={<LoginRegister onLogin={setUser} />} />
              <Route path="/users/:userId" element={<UserDetail user={user} />} />
              <Route path="/photos/:userId" element={<UserPhotos user={user} />} />
              {/* <Route path="/users" element={<UserList user={user} />} /> */}
              <Route path="/" element={<Home user={user} />} />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
