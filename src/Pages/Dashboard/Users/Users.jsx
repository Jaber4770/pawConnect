import React, { useState } from "react";
import {
    Box,
    Button,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Avatar,
    Typography,
    Stack,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";



const Users = () => {
    const queryClient = useQueryClient();
    const axios = useAxios();
    const [totalUsers, setTotalUsers] = useState(0)

    const fetchUsers = async () => {
        const { data } = await axios.get("/users"); // your API endpoint
        setTotalUsers(data.length);
        return data;
    };

    const updateUserRole = async ({ id, role }) => {
        const { data } = await axios.patch(`/users/${id}/role`, { role });
        if (data?.success) {
            Swal.fire({
                icon: "success",
                title: data?.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
        return data;
    };

    const updateUserBanStatus = async ({ id, banned }) => {
        const { data } = await axios.patch(`/users/${id}/ban`, { banned });
        if (data?.success) {
            Swal.fire({
                icon: "success",
                title: data?.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
        return data;
    };

    // Fetch users
    const { data: users, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    // Mutations
    const roleMutation = useMutation({
        mutationFn: updateUserRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const banMutation = useMutation({
        mutationFn: updateUserBanStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });


    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error loading users</Typography>;

    const makeAdmin = (id) => {
        roleMutation.mutate({ id, role: "admin" });
    };

    const removeAdmin = (id) => {
        roleMutation.mutate({ id, role: "user" });
    };

    const toggleBan = (id, banned) => {
        banMutation.mutate({ id, banned: !banned });
    };

    return (
        <Box p={2}>
            <Typography variant="h5" mb={2}>
                Total Users: {totalUsers}
            </Typography>

            <MuiTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Profile</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role / Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <Avatar src={user.profilePic} alt={user.name} />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: '600',
                                    color: user.banned
                                        ? 'red'
                                        : user.role === 'admin'
                                            ? 'green'
                                            : '#f97316', // Tailwind's orange-500
                                }}
                            >
                                {user.banned ? 'Banned' : user.role}
                            </TableCell>

                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    {!user.banned && user.role !== "admin" && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => makeAdmin(user._id)}
                                            disabled={roleMutation.isLoading || banMutation.isLoading}
                                        >
                                            Make Admin
                                        </Button>
                                    )}

                                    {!user.banned && user.role === "admin" && (
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            onClick={() => removeAdmin(user._id)}
                                            disabled={roleMutation.isLoading || banMutation.isLoading}
                                        >
                                            Remove Admin
                                        </Button>
                                    )}

                                    <Button
                                        variant="outlined"
                                        color={user.banned ? "success" : "error"}
                                        size="small"
                                        onClick={() => toggleBan(user._id, user.banned)}
                                        disabled={roleMutation.isLoading || banMutation.isLoading}
                                    >
                                        {user.banned ? "Unban" : "Ban"}
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </Box>
    );
};

export default Users;
