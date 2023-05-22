import React, {useState} from 'react'
import axios from 'axios';

function Login() {
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async(event) =>
    {
        event.preventDefault();
        try
        {
        const response = await axios.post('http://localhost:8000/api/v1/recipes/login', {password, username});
        console.log(response.data);
        if (response.status === 200)
        {
            setSuccessMessage(response.data.message);
        }
        }
        catch(error)
        {
        console.log('error');
        }
    };
  return (
    <>
    <h1>Login</h1>
    {successMessage && <p>{successMessage}</p>}
    <form onSubmit={handleSubmit}>

      <label htmlFor="username">Username</label>
      <input type="text" id="username" value={username}
      onChange={(e) => setUsername(e.target.value)} placeholder='username'/>

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password}
      onChange={(e) => setPassword(e.target.value)} placeholder='password'/>

      <button type="submit">Login</button>

    
    </form>
    </>
  )
}

export default Login