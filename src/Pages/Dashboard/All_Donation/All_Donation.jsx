import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Paper,
} from "@mui/material";
// import axios from "axios"; // ✅ Enable when using API

const All_Donation = () => {
    // ✅ Dummy data for development
    const [campaigns, setCampaigns] = useState([
        {
            _id: "1",
            title: "Help Stray Dogs",
            description: "Raising funds for food and shelter.",
            amountRaised: 100,
            targetAmount: 500,
            status: "active", // or "paused"
            ownerEmail: "user1@example.com",
        },
        {
            _id: "2",
            title: "Cat Rescue Mission",
            description: "Medical care for rescued cats.",
            amountRaised: 300,
            targetAmount: 1000,
            status: "paused",
            ownerEmail: "user2@example.com",
        },
    ]);

    const [loading, setLoading] = useState(false);

    // ✅ Fetch from API (placeholder)
    /*
    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/donations");
                setCampaigns(res.data);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, []);
    */

    // ✅ Admin actions (placeholder)
    const handlePauseToggle = (id) => {
        setCampaigns((prev) =>
            prev.map((c) =>
                c._id === id ? { ...c, status: c.status === "paused" ? "active" : "paused" } : c
            )
        );
        // axios.patch(`/api/donations/${id}/pause-toggle`);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this campaign?")) {
            setCampaigns((prev) => prev.filter((c) => c._id !== id));
            // axios.delete(`/api/donations/${id}`);
        }
    };

    const handleEdit = (id) => {
        // ✅ Redirect or open modal
        alert(`Edit campaign: ${id}`);
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom>
                All Donation Campaigns
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : campaigns.length === 0 ? (
                <Typography>No donation campaigns found.</Typography>
            ) : (
                <Paper elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Raised</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {campaigns.map((c) => (
                                <TableRow key={c._id}>
                                    <TableCell>{c.title}</TableCell>
                                    <TableCell>{c.description}</TableCell>
                                    <TableCell>
                                        ${c.amountRaised} / ${c.targetAmount}
                                    </TableCell>
                                    <TableCell>
                                        <strong
                                            style={{
                                                color:
                                                    c.status === "paused" ? "orange" : "green",
                                            }}
                                        >
                                            {c.status}
                                        </strong>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            size="small"
                                            onClick={() => handleEdit(c._id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color={c.status === "paused" ? "success" : "warning"}
                                            size="small"
                                            onClick={() => handlePauseToggle(c._id)}
                                        >
                                            {c.status === "paused" ? "Unpause" : "Pause"}
                                        </Button>
                                        <Button
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(c._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Box>
    );
};

export default All_Donation;
