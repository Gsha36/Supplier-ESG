import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  ToastProvider,
  ToastViewport,
  ToastAction,
} from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register.tsx";
import CompanyDashboard from "./components/Dashboards/CompanyDashboard";
import SupplierDashboard from "./components/Dashboards/SupplierDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard";

const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole?: string;
}) => {
  const { user, loading, getDashboardPath } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // If still loading user, show a loading screen or spinner
  if (loading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  // If the user is not authenticated
  if (!user) {
    toast({
      title: "Error",
      description: "You must be logged in to access this page.",
      variant: "destructive",
      action: <ToastAction altText="Login">Login</ToastAction>,
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user does not have the required role
  if (requiredRole && user.role !== requiredRole) {
    toast({
      title: "Error",
      description: "You do not have permission to access this page.",
      variant: "destructive",
      action: <ToastAction altText="OK">OK</ToastAction>,
    });
    return <Navigate to={getDashboardPath(user.role)} replace />; // Redirect to the correct dashboard
  }

  return children;
};



const App = () => {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/company-dashboard"
            element={
              <ProtectedRoute requiredRole="Admin">
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier-dashboard"
            element={
              <ProtectedRoute requiredRole="Supplier">
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="SuperUser">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Toast notifications */}
        <ToastViewport />
      </Router>
      <Toaster />
    </ToastProvider>
  );
};

export default App;
