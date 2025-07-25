import React from "react";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";

const All_Pets = () => {
    const axios = useAxios();

    const fetchPets = async () => {
        const res = await axios.get("/pet-listing"); // Adjust API path accordingly
        return res.data.pets; // Expect your API returns an array of pets with needed fields
    };

    const { data: pets = [], isLoading, isError } = useQuery({
        queryKey: ['pets'],
        queryFn: fetchPets,
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error fetching pets.</Typography>;
    if (pets.length === 0) return <Typography>No pets found.</Typography>;

    return (
        <Box mt={4}>
            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pet Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Adoption Status</TableCell>
                            <TableCell>Date Added</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Requester Name</TableCell>
                            <TableCell>Requester Phone</TableCell>
                            <TableCell>Requester Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pets.map((pet) => {
                            const isAdopted = pet.adoptionStatus === "Accepted";
                            const requester = isAdopted ? pet.requester || {} : {};

                            return (
                                <TableRow key={pet._id}>
                                    <TableCell>{pet.name}</TableCell>
                                    <TableCell>
                                        <img
                                            src={pet.image}
                                            alt={pet.name}
                                            style={{ width: 60, height: 60, objectFit: "cover" }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <strong
                                            style={{
                                                color:
                                                    pet.adoptionStatus === "Accepted"
                                                        ? "green"
                                                        : pet.adoptionStatus === "Rejected"
                                                            ? "red"
                                                            : "orange",
                                            }}
                                        >
                                            {pet.adoptionStatus}
                                        </strong>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(pet.dateAdded).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{pet.location}</TableCell>
                                    <TableCell>{pet.category}</TableCell>
                                    <TableCell>{isAdopted ? pet.RequesterName || "N/A" : "N/A"}</TableCell>
                                    <TableCell>{isAdopted ? pet.RequesterPhone || "N/A" : "N/A"}</TableCell>
                                    <TableCell>{isAdopted ? pet.location || "N/A" : "N/A"}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};

export default All_Pets;
