import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const { role, loading: authLoading } = useUserRole();

    /* 
        console.log('user email:', user?.email);
        console.log('role from backend:', role); */


    if (loading || authLoading) {
        return <Loader></Loader>
    }

    if (!loading && !authLoading && (!user || role !== 'admin')) {
        return <Navigate to="/forbidden" />;
    }

    return (
        children
    );
};

export default AdminRoute;