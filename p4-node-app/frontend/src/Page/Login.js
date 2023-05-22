import React, {useState} from 'react'
import axios from 'axios';

function Login() {
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');

    const handleSubmit = async(event) =>
    {
        event.preventDefault();
        try
        {
        const response = await axios.post('http://localhost:8000/api/v1/recipes/login', {password, email});
        console.log(response.data);
        }
        catch(error)
        {
        console.log('error');
        }
    };
  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>

      <label htmlFor="email">Email</label>
      <input type="text" id="email" value={email}
      onChange={(e) => setEmail(e.target.value)} placeholder='email'/>

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password}
      onChange={(e) => setPassword(e.target.value)} placeholder='password'/>

      <button type="submit">Register</button>

    
    </form>
    </>
  )
}

export default Login