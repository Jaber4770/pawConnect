import React, { useEffect, useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Typography,
    Paper,
    Box,
} from "@mui/material";
// import axios from "axios"; // ✅ Uncomment when enabling real API calls

const Addoption_Request = () => {
    // ✅ Dummy data to prevent `map` errors during development
    const [requests, setRequests] = useState([
        {
            _id: "req123",
            petName: "Charlie",
            requesterName: "John Doe",
            requesterEmail: "john@example.com",
            requesterPhone: "1234567890",
            requesterLocation: "Dhaka",
            status: "pending",
        },
        {
            _id: "req456",
            petName: "Bella",
            requesterName: "Jane Smith",
            requesterEmail: "jane@example.com",
            requesterPhone: "9876543210",
            requesterLocation: "Chittagong",
            status: "accepted",
        },
    ]);

    const [loading, setLoading] = useState(false); // ✅ Set to false to skip loading state

    // const { user } = useAuth(); // ✅ Uncomment when using auth
    // const loggedInUserEmail = user?.email;
    const loggedInUserEmail = "user@example.com"; // ✅ Replace this with real user email later

    // ✅ Fetch requests from API (disabled for now)
    /*
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(`/api/adoption-requests?ownerEmail=${loggedInUserEmail}`);
                setRequests(res.data);
            } catch (err) {
                console.error("Error fetching requests", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [loggedInUserEmail]);
    */

    // ✅ Send status update to server (disabled for now)
    const handleUpdateStatus = async (requestId, status) => {
        try {
            // await axios.patch(`/api/adoption-requests/${requestId}`, { status }); // ✅ Enable this when API is ready
            // ✅ Update status locally
            setRequests((prev) =>
                prev.map((r) => (r._id === requestId ? { ...r, status } : r))
            );
        } catch (err) {
            console.error("Error updating status", err);
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom>
                Adoption Requests
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : requests.length === 0 ? (
                <Typography>No adoption requests found.</Typography>
            ) : (
                <Paper elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Pet Name</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req._id}>
                                    <TableCell>{req.petName}</TableCell>
                                    <TableCell>{req.requesterName}</TableCell>
                                    <TableCell>{req.requesterEmail}</TableCell>
                                    <TableCell>{req.requesterPhone}</TableCell>
                                    <TableCell>{req.requesterLocation}</TableCell>
                                    <TableCell>
                                        <strong>{req.status}</strong>
                                    </TableCell>
                                    <TableCell>
                                        {req.status === "pending" ? (
                                            <>
                                                <Button
                                                    size="small"
                                                    color="success"
                                                    onClick={() => handleUpdateStatus(req._id, "accepted")}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleUpdateStatus(req._id, "rejected")}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        ) : (
                                            <Typography color="textSecondary">{req.status}</Typography>
                                        )}
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

export default Addoption_Request;
