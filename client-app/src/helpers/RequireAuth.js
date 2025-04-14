import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        // Bewaart huidige URL voor redirect na login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
