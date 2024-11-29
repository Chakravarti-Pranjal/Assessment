import React, { useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/userSlice.js';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const response = await fetch('./users.csv');
    const csvText = await response.text();

    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        const users = results.data;

        const user = users.find(
          (user) => user.Username === username && user.Password === password
        );

        if (user) {
          dispatch(setUserId(parseInt(user.UserID, 10))); // Save userId in Redux
          setIsAuthenticated(true);
          alert('Login successful.');
          navigate('/home'); // Navigate to home
        } else {
          alert('Invalid credentials');
        }
      },
      error: (err) => {
        console.error('Error reading CSV file:', err);
        alert('Failed to validate credentials');
      },
    });
  };

  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center bg-gray-400 h-screen">
        <div className="w-[330px] mx-auto border-2 border-white p-6 rounded-xl">
          <div className="mb-5">
            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">
              Your username
            </label>
            <input
              type="text"
              id="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border rounded-lg border-gray-300 text-gray-900 w-full p-2.5"
              placeholder="user124"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
