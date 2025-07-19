import React, { useState } from "react";
import {
    Box,
    Button,
    Table as MuiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Typography,
} from "@mui/material";

const My_Donation = () => {
    // Dummy donation records where the logged user donated
    const [donations, setDonations] = useState([
        {
            id: "d1",
            petName: "Buddy",
            petImage:
                "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=64&q=80",
            donatedAmount: 150,
        },
        {
            id: "d2",
            petName: "Whiskers",
            petImage:
                "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=64&q=80",
            donatedAmount: 75,
        },
    ]);

    const handleRefund = (id) => {
        if (
            window.confirm(
                "Are you sure you want to ask for a refund and remove your donation?"
            )
        ) {
            setDonations((prev) => prev.filter((donation) => donation.id !== id));
            // TODO: call API to process refund and update DB
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h4" mb={2}>
                My Donations
            </Typography>

            {donations.length === 0 ? (
                <Typography>No donations found.</Typography>
            ) : (
                <MuiTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pet Image</TableCell>
                            <TableCell>Pet Name</TableCell>
                            <TableCell>Donated Amount</TableCell>
                            <TableCell>Refund</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {donations.map(({ id, petName, petImage, donatedAmount }) => (
                            <TableRow key={id}>
                                <TableCell>
                                    <Avatar src={petImage} alt={petName} />
                                </TableCell>
                                <TableCell>{petName}</TableCell>
                                <TableCell>${donatedAmount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRefund(id)}
                                    >
                                        Ask for Refund
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            )}

            {/*
        TODO when API ready:
        1. Fetch user's donations from backend.
        2. Implement refund API call on handleRefund.
      */}
        </Box>
    );
};

export default My_Donation;
