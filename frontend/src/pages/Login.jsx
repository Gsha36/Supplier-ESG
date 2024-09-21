import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SupplierLogin from '../components/SupplierLogin';
import CompanyLogin from '../components/CompanyLogin';
import RootUserLogin from '../components/RootUserLogin';

const LoginFlow = ({ baseURL }) => {
  const [role, setRole] = useState('Company');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/users/login`, {
        username,
        password,
        role,
      });
      localStorage.setItem('token', response.data.data.accessToken);
      setIsLoggedIn(true);
      // Navigate to appropriate dashboard based on role
      if (role === 'Company') {
        navigate('/company-dashboard');
      } else if (role === 'Supplier') {
        navigate('/supplier-dashboard');
      } else if (role === 'Root User') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const renderRoleBasedComponent = () => {
    if (role === 'Supplier') {
      return <SupplierLogin baseURL={baseURL} />;
    } else if (role === 'Company') {
      return <CompanyLogin baseURL={baseURL} />;
    } else if (role === 'Root User') {
      return <RootUserLogin baseURL={baseURL} />;
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {!isLoggedIn ? (
          <>
            <div className="flex justify-center space-x-4 mb-6">
              {['Company', 'Supplier', 'Root User'].map((r) => (
                <button
                  key={r}
                  className={`px-4 py-2 rounded-full ${role === r ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'} border transition-colors duration-200`}
                  onClick={() => setRole(r)}
                >
                  {r}
                </button>
              ))}
              
            </div>
            {renderRoleBasedComponent()}
          </>
        ) : (
          <p className="text-center">You are logged in.</p>
        )}
      </div>
    </div>
  );
};

export default LoginFlow;
