import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleLogin = async () => {
    try {
      setError(''); 
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log("login successful");
      const token = data.token; 
      localStorage.setItem('token', token);
      navigate('/dash');
      
    } catch (error) {
      setError(error.message || 'An unexpected error occurred.');
      console.error('Login error:', error);
    }
  };

 
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError('');
  };

  return (
    <div className=''>
      <div className="card bg-gray-600 w-96 shadow-sm mx-auto mt-36">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">Login</h2>
          <div className='space-y-4 mt-5'>
            <fieldset className="fieldset">
              <input 
                type="text" 
                className="input w-64" 
                placeholder="email" 
                value={email}
                onChange={handleInputChange(setEmail)} 
              />
            </fieldset>
            <fieldset className="fieldset">
              <input 
                type="password"
                className="input w-64" 
                placeholder="password" 
                value={password}
                onChange={handleInputChange(setPassword)} 
              />
            </fieldset>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-500 max-w-64 break-words">
              {error}
            </div>
          )}
          <div className="card-actions mt-6">
            <button className="btn bg-blue-700 w-24 text-white" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
