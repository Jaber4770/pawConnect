import React, { useState } from "react";
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from "../../../Hooks/useAxios";
import Spinner from "../../../Shared/Loader/Spinner";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Addoption_Request = () => {
    const axios = useAxios();
    const queryClient = useQueryClient();
    const { user, loading } = useAuth();

    const [updatingId, setUpdatingId] = useState(null);

    // Fetch function
    const fetchAdoptionRequests = async () => {
        const res = await axios.get(`/pet-listing?email=${user?.email}`);
        return res.data.pets || [];
    };

    // React Query: fetch requests after user is available
    const {
        data: requests = [],
        isPending,
        isError,
    } = useQuery({
        queryKey: ['adoption-requests', user?.email],
        queryFn: fetchAdoptionRequests,
        enabled: !!user?.email, // only run when user is ready
    });

    // React Mutation: update request status
    const mutation = useMutation({
        mutationFn: async ({ requestId, status }) => {
            const res = await axios.patch(`/pet-listing/${requestId}`, { status });
            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: `${res?.data?.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
           };
            return res.data;
        },
        onMutate: ({ requestId }) => {
            setUpdatingId(requestId);
        },
        onSettled: () => {
            setUpdatingId(null);
            queryClient.invalidateQueries(['adoption-requests', user?.email]);
        },
    });

    const handleUpdateStatus = (requestId, status) => {
        mutation.mutate({ requestId, status });
    };

    // Show loading spinner while auth is loading
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Spinner />
            </Box>
        );
    }

    return (
        <Box mt={4}>
            {isPending && (
                <Box display="flex" justifyContent="center" py={4}>
                    <Spinner />
                </Box>
            )}

            {isError && (
                <Typography color="error" align="center" py={4}>
                    Failed to load requests.
                </Typography>
            )}

            {!isPending && !isError && requests.length === 0 && (
                <Box textAlign="center" py={4}>
                    <Typography variant="body1">No adoption requests found.</Typography>
                </Box>
            )}

            {!isPending && !isError && requests.length > 0 && (
                <Paper elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Pet Name</strong></TableCell>
                                <TableCell><strong>Pet ID</strong></TableCell>
                                <TableCell><strong>Requester Name</strong></TableCell>
                                <TableCell><strong>Requester Email</strong></TableCell>
                                <TableCell><strong>Requester Phone</strong></TableCell>
                                <TableCell><strong>Requester Location</strong></TableCell>
                                <TableCell><strong>Request Date</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req?._id}>
                                    <TableCell>{req?.name}</TableCell>
                                    <TableCell>{req?._id}</TableCell>
                                    <TableCell>{req?.RequesterName || "N/A"}</TableCell>
                                    <TableCell>{req?.RequesterEmail || "N/A"}</TableCell>
                                    <TableCell>{req?.RequesterPhone || "N/A"}</TableCell>
                                    <TableCell>{req?.RequesterAddress || "N/A"}</TableCell>
                                    <TableCell>
                                        {req?.requestDate
                                            ? new Date(req.requestDate).toLocaleString()
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`font-semibold ${req.adoptionStatus === "Pending"
                                                    ? "text-orange-500"
                                                    : req.adoptionStatus === "Rejected"
                                                        ? "text-red-500"
                                                        : "text-green-500"
                                                }`}
                                        >
                                            {req.adoptionStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {req.adoptionStatus === "Pending" ? (
                                            <>
                                                <Button
                                                    size="small"
                                                    color="success"
                                                    onClick={() => handleUpdateStatus(req._id, "Accepted")}
                                                    disabled={mutation.isPending && updatingId === req._id}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleUpdateStatus(req._id, "Rejected")}
                                                    disabled={mutation.isPending && updatingId === req._id}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        ) : (
                                            <Typography component="span" className="text-gray-500">
                                                {req.adoptionStatus}
                                            </Typography>
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
