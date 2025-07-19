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

const My_Donation_Campaign = () => {
    // Dummy donations by logged user
    const [donations, setDonations] = useState([
        {
            id: "1",
            petName: "Buddy",
            maxAmount: 1000,
            collectedAmount: 400,
            paused: false,
            donators: [
                { user: "Alice", amount: 100 },
                { user: "Bob", amount: 300 },
            ],
        },
        {
            id: "2",
            petName: "Whiskers",
            maxAmount: 500,
            collectedAmount: 500,
            paused: true,
            donators: [
                { user: "Carol", amount: 200 },
                { user: "Dave", amount: 300 },
            ],
        },
    ]);

    const [viewDonatorsOpen, setViewDonatorsOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);

    const togglePause = (id) => {
        setDonations((prev) =>
            prev.map((don) =>
                don.id === id ? { ...don, paused: !don.paused } : don
            )
        );
        // TODO: call API to update pause status
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
        // TODO: replace with navigation logic
    };

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                My Donation Campaigns
            </Typography>

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
                        const progressPercent =
                            (don.collectedAmount / don.maxAmount) * 100;
                        return (
                            <TableRow key={don.id}>
                                <TableCell>{don.petName}</TableCell>
                                <TableCell>${don.maxAmount.toLocaleString()}</TableCell>
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
                                        onClick={() => togglePause(don.id)}
                                    >
                                        {don.paused ? "Unpause" : "Pause"}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleEdit(don.id)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        onClick={() => openDonatorsModal(don)}
                                    >
                                        View Donators
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </MuiTable>

            {/* Donators modal */}
            <Dialog
                open={viewDonatorsOpen}
                onClose={closeDonatorsModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Donators for {selectedDonation?.petName}</DialogTitle>
                <DialogContent dividers>
                    {selectedDonation?.donators.length ? (
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

            {/*
        TODO when API ready:
        1. Fetch donation campaigns for logged user from backend.
        2. Implement pause toggle API call.
        3. Implement edit navigation to edit donation page.
        4. Fetch donators list dynamically if needed.
      */}
        </Box>
    );
};

export default My_Donation_Campaign;
