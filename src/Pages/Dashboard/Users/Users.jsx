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

const Users = () => {
    const [users, setUsers] = useState([
        {
            id: "u1",
            name: "Jaber Ahmed",
            email: "jaber@example.com",
            profilePic:
                "https://randomuser.me/api/portraits/men/32.jpg",
            role: "user",
            banned: false,
        },
        {
            id: "u2",
            name: "Fatema Khatun",
            email: "fatema@example.com",
            profilePic:
                "https://randomuser.me/api/portraits/women/44.jpg",
            role: "admin",
            banned: false,
        },
        {
            id: "u3",
            name: "Rakib Hasan",
            email: "rakib@example.com",
            profilePic:
                "https://randomuser.me/api/portraits/men/53.jpg",
            role: "user",
            banned: true,
        },
    ]);

    const makeAdmin = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, role: "admin" } : user
            )
        );
        // TODO: Call backend API to update role
    };

    const toggleBan = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, banned: !user.banned } : user
            )
        );
        // TODO: Call backend API to ban/unban user
    };

    return (
        <Box p={2}>
            <Typography variant="h4" mb={2}>
                Registered Users
            </Typography>

            <MuiTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Profile</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Avatar src={user.profilePic} alt={user.name} />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.banned ? "Banned" : user.role}
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    {user.role !== "admin" && !user.banned && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => makeAdmin(user.id)}
                                        >
                                            Make Admin
                                        </Button>
                                    )}
                                    <Button
                                        variant="outlined"
                                        color={user.banned ? "success" : "error"}
                                        size="small"
                                        onClick={() => toggleBan(user.id)}
                                    >
                                        {user.banned ? "Unban" : "Ban"}
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>

            {/*
        TODO when API ready:
        1. Fetch users from backend.
        2. Update roles and ban status using your API.
        3. Protect login using banned field (on backend).
      */}
        </Box>
    );
};

export default Users;
