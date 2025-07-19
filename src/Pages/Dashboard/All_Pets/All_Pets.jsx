import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
} from "@mui/material";
// import axios from "axios"; // ✅ Uncomment when integrating API

const All_Pets = () => {
    const [pets, setPets] = useState([
        {
            _id: "1",
            name: "Bella",
            type: "Dog",
            breed: "Labrador",
            age: 2,
            status: "not adopted",
            ownerEmail: "owner1@example.com",
        },
        {
            _id: "2",
            name: "Milo",
            type: "Cat",
            breed: "Persian",
            age: 1,
            status: "adopted",
            ownerEmail: "owner2@example.com",
        },
    ]);
    const [loading, setLoading] = useState(false);

    // ✅ Replace with real API fetch
    /*
    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/api/pets");
                setPets(res.data);
            } catch (err) {
                console.error("Error fetching pets", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPets();
    }, []);
    */

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this pet?")) {
            setPets((prev) => prev.filter((p) => p._id !== id));
            // await axios.delete(`/api/pets/${id}`);
        }
    };

    const handleStatusToggle = (id) => {
        setPets((prev) =>
            prev.map((p) =>
                p._id === id
                    ? { ...p, status: p.status === "adopted" ? "not adopted" : "adopted" }
                    : p
            )
        );
        // await axios.patch(`/api/pets/${id}/status-toggle`);
    };

    const handleUpdate = (id) => {
        alert(`Update pet info for ID: ${id}`);
        // Navigate to edit page or open modal
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom>
                All Pets (Admin)
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : pets.length === 0 ? (
                <Typography>No pets found.</Typography>
            ) : (
                <Paper elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Pet Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Breed</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Owner Email</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pets.map((pet) => (
                                <TableRow key={pet._id}>
                                    <TableCell>{pet.name}</TableCell>
                                    <TableCell>{pet.type}</TableCell>
                                    <TableCell>{pet.breed}</TableCell>
                                    <TableCell>{pet.age}</TableCell>
                                    <TableCell>
                                        <strong
                                            style={{
                                                color:
                                                    pet.status === "adopted"
                                                        ? "green"
                                                        : "orange",
                                            }}
                                        >
                                            {pet.status}
                                        </strong>
                                    </TableCell>
                                    <TableCell>{pet.ownerEmail}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => handleUpdate(pet._id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            color={
                                                pet.status === "adopted"
                                                    ? "warning"
                                                    : "success"
                                            }
                                            onClick={() => handleStatusToggle(pet._id)}
                                        >
                                            {pet.status === "adopted"
                                                ? "Mark as Not Adopted"
                                                : "Mark as Adopted"}
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(pet._id)}
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

export default All_Pets;
