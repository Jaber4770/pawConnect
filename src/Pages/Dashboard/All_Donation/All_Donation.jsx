import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    InputLabel
} from "@mui/material";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";

const All_Donation = () => {
    const axios = useAxios();
    const { user } = useAuth();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/donation-campaign");
                setCampaigns(res.data);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, [axios]);

    const handlePauseToggle = async (id, currentStatus) => {
        const confirmResult = await Swal.fire({
            title: currentStatus ? "Resume Campaign?" : "Pause Campaign?",
            text: `Are you sure you want to ${currentStatus ? "resume" : "pause"} this campaign?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: currentStatus ? "Yes, Resume" : "Yes, Pause"
        });

        if (confirmResult.isConfirmed) {
            try {
                await axios.patch(`/donation-campaign/${id}/pause`, { paused: !currentStatus });
                setCampaigns((prev) =>
                    prev.map((c) => (c._id === id ? { ...c, paused: !currentStatus } : c))
                );
                Swal.fire("Success", `Campaign ${currentStatus ? "resumed" : "paused"} successfully`, "success");
            } catch (error) {
                console.error("Error toggling pause/resume:", error);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        }
    };

    const handleDelete = async (id) => {
        const confirmResult = await Swal.fire({
            title: "Delete Campaign?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        });

        if (confirmResult.isConfirmed) {
            try {
                await axios.delete(`/donation-campaign/${id}`);
                setCampaigns((prev) => prev.filter((c) => c._id !== id));
                Swal.fire("Deleted!", "The campaign has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting campaign:", error);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        }
    };

    const handleEdit = (id) => {
        const selected = campaigns.find((c) => c._id === id);
        setEditData({ ...selected });
        setEditOpen(true);
    };

    const handleEditChange = (field, value) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEditSubmit = async () => {
        const { title, goal, petImage, lastDate, description, longDescription } = editData;

        if (!title || !goal || !petImage || !lastDate || !description || !longDescription) {
            Swal.fire("Validation Error", "Please fill in all required fields", "warning");
            return;
        }

        try {
            await axios.put(`/donation-campaign/${editData._id}`, editData);
            setCampaigns((prev) =>
                prev.map((c) =>
                    c._id === editData._id ? { ...c, ...editData, lastDate: new Date(editData.lastDate) } : c
                )
            );
            Swal.fire("Updated!", "Campaign updated successfully", "success");
            setEditOpen(false);
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire("Error", "Failed to update campaign", "error");
        }
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
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>User Email</strong></TableCell>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell><strong>Raised / Goal</strong></TableCell>
                                <TableCell><strong>Created Date</strong></TableCell>
                                <TableCell><strong>Last Date</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {campaigns.map((c) => (
                                <TableRow key={c._id}>
                                    <TableCell>{c.addedBy || "N/A"}</TableCell>
                                    <TableCell>{c.title}</TableCell>
                                    <TableCell>${c.raised || 0} / ${c.goal}</TableCell>
                                    <TableCell>{dayjs(c.createdAt).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell>{dayjs(c.lastDate).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell>
                                        <strong style={{ color: c.paused ? "orange" : "green" }}>
                                            {c.paused ? "Paused" : "Active"}
                                        </strong>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(c._id)} color="primary" size="small" sx={{ mr: 1 }}>
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handlePauseToggle(c._id, c.paused)}
                                            variant="contained"
                                            color={c.paused ? "success" : "warning"}
                                            size="small"
                                            sx={{ mr: 1 }}
                                        >
                                            {c.paused ? "Resume" : "Pause"}
                                        </Button>
                                        <Button onClick={() => handleDelete(c._id)} variant="contained" color="error" size="small">
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Edit Modal */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Edit Campaign</DialogTitle>
                <DialogContent dividers>
                    {editData && (
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                {/* Title */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        value={editData.title}
                                        onChange={(e) => handleEditChange("title", e.target.value)}
                                    />
                                </Grid>

                                {/* Pet Picture - file input */}
                                <Grid item xs={12}>
                                    <InputLabel shrink htmlFor="pet-image-file-edit">
                                        Pet Picture *
                                    </InputLabel>
                                    <input
                                        id="pet-image-file-edit"
                                        type="file"
                                        accept="image/*"
                                        style={{ width: "100%" }}
                                        onChange={(e) => handleFileChange(e)} // same handler as create modal
                                    />
                                </Grid>

                                {/* Goal */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Maximum Donation Amount"
                                        type="number"
                                        value={editData.goal}
                                        onChange={(e) => handleEditChange("goal", e.target.value)}
                                    />
                                </Grid>

                                {/* Last Date */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last Date of Donation"
                                        type="date"
                                        value={dayjs(editData.lastDate).format("YYYY-MM-DD")}
                                        onChange={(e) => handleEditChange("lastDate", e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                {/* Category */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Category"
                                        value={editData.category}
                                        onChange={(e) => handleEditChange("category", e.target.value)}
                                    />
                                </Grid>

                                {/* Short Description */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Short Description"
                                        multiline
                                        rows={1}
                                        value={editData.description}
                                        onChange={(e) => handleEditChange("description", e.target.value)}
                                    />
                                </Grid>

                                {/* Long Description */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Long Description"
                                        multiline
                                        rows={4}
                                        value={editData.longDescription}
                                        onChange={(e) => handleEditChange("longDescription", e.target.value)}
                                    />
                                </Grid>

                                {/* Added By (disabled) */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Added By"
                                        value={editData.addedBy || ""}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleEditSubmit}
                    >
                        Update Campaign
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default All_Donation;
