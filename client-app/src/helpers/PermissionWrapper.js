// helpers/PermissionWrapper.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PermissionWrapper = ({ children, requiredPermission }) => {
    const permissions = useSelector(state => state.meDetails.permissions);
    const navigate = useNavigate();

    useEffect(() => {
        if (permissions && Object.keys(permissions).length > 0 && !permissions[requiredPermission]) {
            navigate('/');
        }
    }, [permissions, requiredPermission, navigate]);

    return <>{children}</>;
};

export default PermissionWrapper;
