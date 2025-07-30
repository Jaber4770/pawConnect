import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useUserRole = () => {

    const { user, loading: authLoading } = useAuth();
    const axios = useAxios();

    const {
        data: role = 'user',
        isLoading: roleLoading,
        refetch
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        // enabled: !authLoading && !user?.email,
        queryFn: async () => {
            const res = await axios.get(`/users/${user.email}/role`);
            return res.data.role;
        }
    })

    return { role, loading: authLoading || roleLoading, refetch }

};

export default useUserRole;