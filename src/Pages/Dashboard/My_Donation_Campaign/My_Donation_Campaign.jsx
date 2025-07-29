import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Table as MuiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    LinearProgress,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

const My_Donation_Campaign = () => {
    const queryClient = useQueryClient();
    const [viewDonatorsOpen, setViewDonatorsOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const axios = useAxios();
    const { user, loading } = useAuth();

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ["my-campaigns", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/donation-campaign?email=${user.email}`);
            return res.data;
        },
    });

    const pauseMutation = useMutation({
        mutationFn: async ({ id, paused }) => {
            await axios.patch(`/donation-campaign/${id}`, { paused: !paused });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["my-campaigns", user?.email]);
        },
    });

    const togglePause = (id, paused) => {
        pauseMutation.mutate({ id, paused });
    };

    const openDonatorsModal = (donation) => {
        setSelectedDonation(donation);
        setViewDonatorsOpen(true);
    };

    const closeDonatorsModal = () => {
        setSelectedDonation(null);
        setViewDonatorsOpen(false);
    };

    const handleEdit = (id) => {
        alert(`Redirect to edit donation campaign with id: ${id}`);
        // You can navigate using react-router-dom: navigate(`/edit-campaign/${id}`);
    };

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                My Donation Campaigns
            </Typography>

            {loading || isLoading ? (
                <Typography>Loading...</Typography>
            ) : donations.length === 0 ? (
                <Typography>No campaigns found.</Typography>
            ) : (
                <MuiTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pet Name</TableCell>
                            <TableCell>Max Donation Amount</TableCell>
                            <TableCell>Progress</TableCell>
                            <TableCell>Pause</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>View Donators</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donations.map((don) => {
                            const progressPercent = (don.raised / don.goal) * 100;
                            return (
                                <TableRow key={don._id}>
                                    <TableCell>{don.petName}</TableCell>
                                    <TableCell>${don.goal}</TableCell>
                                    <TableCell style={{ minWidth: 150 }}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Box flexGrow={1}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={progressPercent}
                                                    color={don.paused ? "secondary" : "primary"}
                                                />
                                            </Box>
                                            <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {progressPercent.toFixed(0)}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant={don.paused ? "contained" : "outlined"}
                                            color={don.paused ? "warning" : "primary"}
                                            onClick={() => togglePause(don._id, don.paused)}
                                        >
                                            {don.paused ? "Unpause" : "Pause"}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleEdit(don._id)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => openDonatorsModal(don)}>
                                            View Donators
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </MuiTable>
            )}

            <Dialog
                open={viewDonatorsOpen}
                onClose={closeDonatorsModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Donators for {selectedDonation?.petName}</DialogTitle>
                <DialogContent dividers>
                    {selectedDonation?.donators?.length ? (
                        <MuiTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Donator</TableCell>
                                    <TableCell>Amount Donated</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedDonation.donators.map((donator, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{donator.user}</TableCell>
                                        <TableCell>${donator.amount.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </MuiTable>
                    ) : (
                        <Typography>No donators yet.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDonatorsModal}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default My_Donation_Campaign;
