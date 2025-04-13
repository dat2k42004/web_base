import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import models from "../../modelData/models";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const params = useParams();
  const [context, setContext] = useState('');
  const [userName, setUserName] = useState('Nguyen Duc Dat');

  useEffect(() => {
    const pathname = location.pathname;
    const userId = params.userId;

    let currentContext = '';

    if (pathname === '/') {
        currentContext = '';
    } else if (pathname.startsWith('/users/')) {
        if (userId) {
            const user = models.userModel(userId);
            if (user) {
                currentContext = `Details of ${user.first_name} ${user.last_name}`;
            } else {
                currentContext = 'User Not Found';
            }
        } else {
             currentContext = 'User List'; 
        }
    } else if (pathname.startsWith('/photos/')) {
        if (userId) {
            const user = models.userModel(userId);
            if (user) {
                currentContext = `Photos of ${user.first_name} ${user.last_name}`;
            } else {
                currentContext = 'User Not Found';
            }
        }
    } 

    setContext(currentContext);

  }, [location.pathname, params.userId]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }}
        >
          {userName}
        </Typography>
        
        <Typography variant="h6" component="div">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
