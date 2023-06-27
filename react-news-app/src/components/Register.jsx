import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error('Invalid email address');
      return;
    }
    if (password !== confirmPassword || password === '') {
      toast.error('Passwords do not match');
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    axios
      .post('http://127.0.0.1:8000/api/signup', user)
      .then((response) => {
        toast.success('User registered successfully');
        navigate('/login');
      })
      .catch((error) => {
        toast.error('Error registering user');
      });
  };

  return (
    <div className="user-form">
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <TextField
          id="Name"
          type="text"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          id="confirm-password"
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
        <Link to="/login">Already registered? Login</Link>
      </Box>
    </div>
  );
};

export default Register;
