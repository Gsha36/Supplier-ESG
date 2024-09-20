import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFlow from './pages/Login';
import CompanyDashboard from './components/Dashboards/CompanyDashboard';
import SupplierDashboard from './components/Dashboards/SupplierDashboard';
import AdminDashboard from './components/Dashboards/AdminDashboard';

function App() {
  // Define the base URL here
  const baseURL = 'http://localhost:8000'; 

  return (
      <Routes>
        <Route path="/" element={<LoginFlow baseURL={baseURL} />} />
        <Route path="/company-dashboard" element={<CompanyDashboard baseURL={baseURL} />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard baseURL={baseURL} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard baseURL={baseURL} />} />
      </Routes>
  );
}

export default App;
