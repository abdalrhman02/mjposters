import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

const withAdminProtection = (Component) => {
    return (props) => {
        const { currentUser, userRole } = useAuth();

        if (!currentUser || userRole !== 'Admin') {
            return <Redirect to="/" />;
        }

        return <Component {...props} />;
    };
};

export default withAdminProtection;