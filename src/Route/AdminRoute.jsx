import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Spinner from '../Shared/Loader/Spinner';

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const { role, loading: authLoading } = useUserRole();

    if (loading || authLoading) {
        return <Spinner></Spinner>
    }

    if (!loading && !authLoading && (!user || role !== 'admin')) {
        return <Navigate to="/forbidden" />;
    }

    return (
        children
    );
};

export default AdminRoute;