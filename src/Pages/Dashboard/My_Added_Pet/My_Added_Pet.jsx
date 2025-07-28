import React, { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Backdrop,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import Spinner from "../../../Shared/Loader/Spinner";
import Swal from "sweetalert2";



const My_Added_Pet = () => {
    const axios = useAxios();
    const { user, loading } = useAuth();
    const queryClient = useQueryClient();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);


    // ✅ Now axios is in scope
    const fetchPets = async () => {
        const res = await axios.get(`/pet-listing?email=${user?.email}`);
        // console.log(res.data.pets);
        return res?.data?.pets;
    };

    const { data: pets = [], isLoading } = useQuery({
        queryKey: ["pets", user.email],
        queryFn: fetchPets,
        enabled: !loading && !!user?.email, // ✅ Wait until loading is false and email is available
    });

    // update pet
    const updatePetMutation = useMutation({
        mutationFn: ({ id, email, updatedPet }) =>
            axios.put(`/pet-listing/${id}`, { email, ...updatedPet }),
        onSuccess: () => {
            queryClient.invalidateQueries(["pets", user.email]);
            handleCloseEditModal();
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Your pet information has been successfully updated.',
                confirmButtonColor: '#f97316',
            });
        },
    });


    // delete pet
    const deletePetMutation = useMutation({
        mutationFn: (id) => axios.delete(`/pet-listing/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["pets", user.email]);
        },
    });


    const handleOpenEditModal = (pet) => {
        setSelectedPet(pet);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedPet(null);
    };

    const handleEditChange = (field, value) => {
        setSelectedPet((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        if (!selectedPet) {
            console.error("No selected pet!");
            return;
        }

        const { _id, adoptionStatus, ...rest } = selectedPet;

        const originalPet = pets.find(pet => pet._id === _id);
        const updatedPet = {
            ...rest,
            adoptionStatus: originalPet?.adoptionStatus || "Available",
        };

        updatePetMutation.mutate({ id: _id, email: user.email, updatedPet });
    };



    if (isLoading) return <Typography><Spinner></Spinner></Typography>;
    if (loading) return <Spinner></Spinner>

    return (
        <Box p={2}>
            <MuiTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Requester Name</TableCell>
                        <TableCell>Requester Phone</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pets.map((pet) => (
                        <TableRow key={pet._id}>
                            <TableCell>{pet.name}</TableCell>
                            <TableCell>
                                {pet.adoptionStatus === "Accepted" ? (
                                    <span className="font-medium text-gray-700">{pet.RequesterName || "N/A"}</span>
                                ) : (
                                    "-"
                                )}
                            </TableCell>
                            <TableCell>{pet.RequesterPhone}</TableCell>
                            <TableCell>
                                <img
                                    src={pet.image}
                                    alt={pet.name}
                                    style={{ width: 60, height: 60, objectFit: "cover" }}
                                />
                            </TableCell>
                            <TableCell>{pet.category}</TableCell>
                            <TableCell>
                                <span
                                    className={`font-semibold ${pet.adoptionStatus === "Rejected"
                                            ? "text-red-500"
                                            : pet.adoptionStatus === "Accepted"
                                                ? "text-green-500"
                                                : pet.adoptionStatus === "Available"
                                                    ? "text-orange-500"
                                                    : ""
                                        }`}
                                >
                                    {pet.adoptionStatus}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    disabled={pet.adoptionStatus === "Accepted"}
                                    onClick={() => handleOpenEditModal(pet)}
                                    sx={{ mr: 1 }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={async () => {
                                        const result = await Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#f97316',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, delete it!',
                                        });

                                        if (result.isConfirmed) {
                                            deletePetMutation.mutate(pet._id);
                                            Swal.fire(
                                                'Deleted!',
                                                'Your pet has been deleted.',
                                                'success'
                                            );
                                        }
                                    }}
                                    disabled={deletePetMutation.isLoading}
                                >
                                    Delete
                                </Button>

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>

            {/* Edit Modal */}
            <Dialog
                open={editModalOpen}
                onClose={handleCloseEditModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ style: { backdropFilter: "blur(5px)" } }}
            >
                <DialogTitle>Edit Pet</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Pet Name"
                        fullWidth
                        value={selectedPet?.name || ""}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        fullWidth
                        value={selectedPet?.image || ""}
                        onChange={(e) => handleEditChange("image", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Age"
                        fullWidth
                        value={selectedPet?.age || ""}
                        onChange={(e) => handleEditChange("age", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Location"
                        fullWidth
                        value={selectedPet?.location || ""}
                        onChange={(e) => handleEditChange("location", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Breed"
                        fullWidth
                        value={selectedPet?.breed || ""}
                        onChange={(e) => handleEditChange("breed", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Gender"
                        fullWidth
                        value={selectedPet?.gender || ""}
                        onChange={(e) => handleEditChange("gender", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Size"
                        fullWidth
                        value={selectedPet?.size || ""}
                        onChange={(e) => handleEditChange("size", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Color"
                        fullWidth
                        value={selectedPet?.color || ""}
                        onChange={(e) => handleEditChange("color", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Category"
                        fullWidth
                        value={selectedPet?.category || ""}
                        onChange={(e) => handleEditChange("category", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        multiline
                        rows={3}
                        fullWidth
                        value={selectedPet?.description || ""}
                        onChange={(e) => handleEditChange("description", e.target.value)}
                    />
                    {/* Boolean fields */}
                    <Box display="flex" gap={2} mt={2} flexWrap="wrap">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedPet?.vaccinated || false}
                                    onChange={(e) => handleEditChange("vaccinated", e.target.checked)}
                                    sx={{
                                        color: "#f97316",
                                        '&.Mui-checked': {
                                            color: "#f97316",
                                        },
                                    }}
                                />
                            }
                            label="Vaccinated"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedPet?.neutered || false}
                                    onChange={(e) => handleEditChange("neutered", e.target.checked)}
                                    sx={{
                                        color: "#f97316",
                                        '&.Mui-checked': {
                                            color: "#f97316",
                                        },
                                    }}
                                />
                            }
                            label="Neutered"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedPet?.goodWithKids || false}
                                    onChange={(e) => handleEditChange("goodWithKids", e.target.checked)}
                                    sx={{
                                        color: "#f97316",
                                        '&.Mui-checked': {
                                            color: "#f97316",
                                        },
                                    }}
                                />
                            }
                            label="Good With Kids"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedPet?.goodWithOtherPets || false}
                                    onChange={(e) => handleEditChange("goodWithOtherPets", e.target.checked)}
                                    sx={{
                                        color: "#f97316",
                                        '&.Mui-checked': {
                                            color: "#f97316",
                                        },
                                    }}
                                />
                            }
                            label="Good With Other Pets"
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseEditModal} sx={{ color: '#f97316' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveChanges}
                        disabled={updatePetMutation.isLoading}
                    >
                        update
                    </Button>
                </DialogActions>

            </Dialog>
        </Box>
    );
};

export default My_Added_Pet;
