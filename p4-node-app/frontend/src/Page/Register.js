import React, { useState } from 'react'
import axios from 'axios'
import { responsiveFontSizes } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async(event) =>
  {
    event.preventDefault();
    try
    {
      const response = await axios.post('http://localhost:8000/api/v1/recipes/register', {username, password, email});
      console.log(response.data);
      if (response.status === 201)
      {
          setSuccessMessage(response.data.message);
      };
    }
    catch(error)
    {
      console.log('error');
    }
  };

  return (
    <>
    <h1>Register</h1>
    {successMessage && <p>{successMessage}</p>}
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" value={username}
      onChange={(e) => setUsername(e.target.value)} placeholder='username'/>

      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email}
      onChange={(e) => setEmail(e.target.value)} placeholder='email'/>

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password}
      onChange={(e) => setPassword(e.target.value)} placeholder='password'/>

      <button type="submit">Register</button>

    
    </form>
    </>
  )
}

export default Register