import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Spinner from '../Shared/Loader/Spinner';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    // const navigate = useNavigate();

    if (loading) {
        return <Spinner></Spinner>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;