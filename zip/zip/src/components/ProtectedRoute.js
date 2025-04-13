// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component }) => {
  const isLoggedIn = Cookies.get('userId');
  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
