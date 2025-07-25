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
} from "@mui/material";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import Spinner from "../../../Shared/Loader/Spinner";



const My_Added_Pet = () => {
    const axios = useAxios();
    const { user, loading } = useAuth();
    const queryClient = useQueryClient();

    if (loading) return <Spinner></Spinner>


    // ✅ Now axios is in scope
    const fetchPets = async () => {
        const res = await axios.get(`/pet-listing?email=${user?.email}`);
        // console.log(res.data.pets);
        return res?.data?.pets;
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    const { data: pets = [], isLoading } = useQuery({
        queryKey: ["pets", user.email],
        queryFn: fetchPets,
    });

    const updatePetMutation = useMutation({
        mutationFn: ({ id, email, updatedPet }) =>
            axios.put(`/api/pets/${id}`, { email, ...updatedPet }),
        onSuccess: () => {
            queryClient.invalidateQueries(["pets", user.email]);
            handleCloseEditModal();
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
        const { id, ...updatedPet } = selectedPet;
        updatePetMutation.mutate({ id, email: user.email, updatedPet });
    };

    if (isLoading) return <Typography><Spinner></Spinner></Typography>;

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                My Added Pets
            </Typography>

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
                                <Button variant="outlined"
                                    disabled={pet.adoptionStatus === "Accepted"}
                                    onClick={() => handleOpenEditModal(pet)}>
                                    Edit
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
                        label="Category"
                        fullWidth
                        value={selectedPet?.category || ""}
                        onChange={(e) => handleEditChange("category", e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal}>Cancel</Button>
                    <Button onClick={handleSaveChanges} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default My_Added_Pet;
