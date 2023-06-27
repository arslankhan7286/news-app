import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    axios
      .post('http://127.0.0.1:8000/api/login', user)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        toast.success('Logged in successfully');
        navigate('/');
      })
      .catch((error) => {
        toast.error('Invalid email or password');
      });
  };

  return (
    <div className="user-form">
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link to="/register">Not registered? Signup</Link>
      </Box>
    </div>
  );
};

export default Login;
