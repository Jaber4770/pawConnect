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
    TextField,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const My_Donation_Campaign = () => {
    const queryClient = useQueryClient();
    const axios = useAxios();
    const { user, loading } = useAuth();

    const [viewDonatorsOpen, setViewDonatorsOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);

    // Edit Modal state
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ["my-campaigns", user?.email],
        queryFn: async () => {
            const res = await axios.get(`/donation-campaign?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        staleTime: 1000 * 60 * 5,
    });

    const pauseMutation = useMutation({
        mutationFn: async ({ id, paused }) => {
            await axios.patch(`/donation-campaign/${id}/pause`, { paused: !paused });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-campaigns", user?.email] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const res = await axios.put(`/donation-campaign-user/${id}`, updatedData);
            return res.data;
        },
        onSuccess: (updatedCampaign) => {
            queryClient.setQueryData(["my-campaigns", user?.email], (old) => {
                if (!old) return [];
                return old.map((campaign) =>
                    campaign._id === updatedCampaign._id ? updatedCampaign : campaign
                );
            });
            setEditOpen(false);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Campaign updated successfully",
                timer: 2000,
                showConfirmButton: false,
            });
        },

        onError: (error) => {
            alert("Failed to update campaign: " + error.message);
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

    // Open edit modal & prefill form
    const openEditModal = (donation) => {
        setEditData({
            title: donation.title || "",
            petName: donation.petName || "",
            petImage: donation.petImage || "",
            description: donation.description || "",
            longDescription: donation.longDescription || "",
            goal: donation.goal || 0,
            lastDate: donation.lastDate ? donation.lastDate.split("T")[0] : "",
            category: donation.category || "",
        });
        setEditOpen(true);
        setSelectedDonation(donation); // keep id for update
    };

    const closeEditModal = () => {
        setEditOpen(false);
        setEditData(null);
    };

    // Handle form input changes in the modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleUpdate = () => {
        if (!editData) return;

        const {
            title,
            petImage,
            description,
            longDescription,
            goal,
            lastDate,
        } = editData;

        if (
            !title.trim() ||
            !petImage.trim() ||
            !description.trim() ||
            !longDescription.trim() ||
            goal <= 0 ||
            !lastDate
        ) {
            alert("Please fill all required fields and ensure goal is greater than zero.");
            return;
        }

        updateMutation.mutate({
            id: selectedDonation._id,
            updatedData: {
                title: title.trim(),
                petImage: petImage.trim(),
                description: description.trim(),
                longDescription: longDescription.trim(),
                goal: Number(goal),
                lastDate,
                category: editData.category?.trim() || "Pet",
            },
        });
    };




    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                My Donation Campaigns
            </Typography>

            {(loading || isLoading) && <Typography>Loading...</Typography>}

            {!loading && !isLoading && donations.length === 0 && (
                <Typography>No campaigns found.</Typography>
            )}

            {!loading && !isLoading && donations.length > 0 && (
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
                            const progressPercent = Math.min(
                                100,
                                (don.raised / don.goal) * 100
                            );

                            return (
                                <TableRow key={don._id}>
                                    <TableCell>{don.petName}</TableCell>
                                    <TableCell>${don.goal.toLocaleString()}</TableCell>
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
                                            disabled={pauseMutation.isLoading}
                                        >
                                            {don.paused ? "Unpause" : "Pause"}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => openEditModal(don)}
                                            disabled={updateMutation.isLoading}
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
            )}

            {/* View Donators Modal */}
            <Dialog
                open={viewDonatorsOpen}
                onClose={closeDonatorsModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Donators for {selectedDonation?.petName || "Campaign"}
                </DialogTitle>
                <DialogContent dividers>
                    {selectedDonation?.donators?.length > 0 ? (
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
                                        <TableCell>{donator.name}</TableCell>
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

            {/* Edit Campaign Modal */}
            <Dialog open={editOpen} onClose={closeEditModal} maxWidth="md" fullWidth>
                <DialogTitle>Edit Campaign</DialogTitle>
                <DialogContent dividers>
                    {editData ? (
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                mt: 1,
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                label="Pet Name"
                                name="petName"
                                value={editData.petName}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Title"
                                name="title"
                                value={editData.title}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Pet Image URL"
                                name="petImage"
                                value={editData.petImage}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Short Description"
                                name="description"
                                value={editData.description}
                                onChange={handleInputChange}
                                fullWidth
                                multiline
                                minRows={2}
                            />
                            <TextField
                                label="Long Description"
                                name="longDescription"
                                value={editData.longDescription}
                                onChange={handleInputChange}
                                fullWidth
                                multiline
                                minRows={4}
                            />
                            <TextField
                                label="Goal Amount"
                                name="goal"
                                type="number"
                                value={editData.goal}
                                onChange={handleInputChange}
                                fullWidth
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                label="Last Date"
                                name="lastDate"
                                type="date"
                                value={editData.lastDate}
                                onChange={handleInputChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Category"
                                name="category"
                                value={editData.category}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditModal} disabled={updateMutation.isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpdate}
                        variant="contained"
                        disabled={updateMutation.isLoading}
                    >
                        {updateMutation.isLoading ? "Saving..." : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default My_Donation_Campaign;
