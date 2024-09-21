import React, { useState } from 'react';
import axios from 'axios';

const SupplierLogin = ({ baseURL }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/v1/users/login`, {
        username,
        password,
        role: "Supplier",
      });
      localStorage.setItem('token', response.data.data.accessToken);
      console.log("")
      if (!response.data.data.user.passwordChangedAt) {
        setMustChangePassword(true);
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.patch(
        `${baseURL}/api/v1/users/updateMyPassword`,
        { password: newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMustChangePassword(false);
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage('Password change failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Supplier Sign In</h1>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {mustChangePassword ? (
          <div>
            <h2 className="mb-4 text-center">Change Your Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <button onClick={handleChangePassword} className="bg-green-500 text-white py-2 px-4 rounded w-full">
              Change Password
            </button>
          </div>
        ) : !isLoggedIn ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
              Log In
            </button>
          </form>
        ) : (
          <p className="text-center">Supplier Dashboard Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SupplierLogin;
