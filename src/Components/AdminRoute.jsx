import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (userRole !== 'Admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;