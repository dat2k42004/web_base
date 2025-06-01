import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginModel, RegisterModel } from '../../modelData/model';
import { Box, TextField, Button, Typography, Paper, Input } from '@mui/material';
import './styles.css';

function LoginRegister({ onLogin }) {
     const [loginName, setLoginName] = useState("");
     const [pass, setPass] = useState("");
     const navigate = useNavigate();
     const [register, setRegister] = useState(false);
     const [account, setAccount] = useState({
          login_name: "",
          password: "",
          first_name: "",
          last_name: "",
          location: "",
          description: "",
          occupation: "",
     });

     const checkToken = async () => {
          const token = localStorage.getItem("token");
          if (token) {
               try {
                    const res = await LoginModel({ login_name: token.login_name, password: token.password });
                    if (res) {
                         onLogin(res);
                         navigate(`/users/${res._id}`);
                         alert("Login successful");
                    }
               } catch (error) {
                    console.error("Error checking token:", error);
               }
          }
     };

     useEffect(() => {
          checkToken();
     }, []);

     const HandelLogin = async (e) => {
          e.preventDefault();
          if (!loginName.trim()) {
               alert("Please enter a login name.");
               return;
          }
          try {
               const res = await LoginModel({ login_name: loginName, password: pass });
               if (res) {
                    alert("Login successful");
                    onLogin(res);
                    navigate(`/users/${res._id}`);
                    localStorage.setItem("token", res);
               } else {
                    alert("Login failed. Please try again.");
               }
          } catch (error) {
               alert("Login failed. Please try again.");
          }
     };

     const handleRegister = async (e) => {
          e.preventDefault();
          if (
               !account.login_name.trim() ||
               !account.password.trim() ||
               !account.first_name.trim() ||
               !account.last_name.trim() ||
               !account.location.trim() ||
               !account.description.trim() ||
               !account.occupation.trim()
          ) {
               alert("Please fill in all fields.");
               return;
          }
          try {
               const res = await RegisterModel(account);
               if (!res) {
                    setRegister(false);
                    alert("Registration successful. You can now log in.");
               }
          } catch (error) {
               alert("Registration failed. Please try again.");
          }
     };

     return (
          <Box className="login-register-container" display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
               <Paper elevation={3}
                    className="login-register-form"
                    sx={{ p: 4, minWidth: 340, maxWidth: 380, width: '100%' }}>
                    {!register ? (
                         <form onSubmit={HandelLogin}>
                              <Typography variant="h5" align="center" gutterBottom>Login</Typography>
                              <TextField
                                   label="Login Name"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={loginName}
                                   onChange={(e) => setLoginName(e.target.value)}
                              />
                              <TextField
                                   label="Password"
                                   type="password"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={pass}
                                   onChange={(e) => setPass(e.target.value)}
                              />
                              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                   Login
                              </Button>
                              <Typography align="center" sx={{ mt: 2 }}>
                                   If you don't have account, please{" "}
                                   <Button variant="text" onClick={() => setRegister(true)}>Register</Button>
                              </Typography>
                         </form>
                    ) : (
                         <form onSubmit={handleRegister}>
                              <Typography variant="h5" align="center" gutterBottom>Register</Typography>
                              <TextField
                                   label="Login Name"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={account.login_name}
                                   onChange={(e) => setAccount({ ...account, login_name: e.target.value })}
                              />
                              <TextField
                                   label="Password"
                                   type="password"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={account.password}
                                   onChange={(e) => setAccount({ ...account, password: e.target.value })}
                              />
                              <TextField
                                   label="First Name"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={account.first_name}
                                   onChange={(e) => setAccount({ ...account, first_name: e.target.value })}
                              />
                              <TextField
                                   label="Last Name"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={account.last_name}
                                   onChange={(e) => setAccount({ ...account, last_name: e.target.value })}
                              />
                              <TextField
                                   label="Location"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={account.location}
                                   onChange={(e) => setAccount({ ...account, location: e.target.value })}
                              />
                              <TextField
                                   label="Description"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={account.description}
                                   onChange={(e) => setAccount({ ...account, description: e.target.value })}
                              />
                              <TextField
                                   label="Occupation"
                                   variant="standard"
                                   fullWidth
                                   margin="normal"
                                   value={account.occupation}
                                   onChange={(e) => setAccount({ ...account, occupation: e.target.value })}
                              />
                              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                   Register
                              </Button>
                              <Typography align="center" sx={{ mt: 2 }}>
                                   If you have account, please{" "}
                                   <Button variant="text" onClick={() => setRegister(false)}>Login</Button>
                              </Typography>
                         </form>
                    )}
               </Paper>
          </Box>
     );
}

export default LoginRegister;