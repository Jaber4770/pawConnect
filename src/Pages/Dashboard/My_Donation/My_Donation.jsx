import React from "react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

const My_Donation = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const axios = useAxios();

    const fetchDonations = async () => {
        const res = await axios.get(`/donation-record?email=${user?.email}`);
        return res.data;
    };

    const requestRefund = async (id) => {
        const res = await axios.patch(`/donation-record/${id}`, {
            status: "refunded"
        });
        return res.data;
    };

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ["donations", user?.email],
        queryFn: () => fetchDonations(),
        enabled: !!user?.email,
    });

    const refundMutation = useMutation({
        mutationFn: requestRefund,
        onSuccess: () => {
            queryClient.invalidateQueries(["donations", user?.email]);
        },
    });

    const handleRefund = (id) => {
        if (
            window.confirm(
                "Are you sure you want to ask for a refund and remove your donation?"
            )
        ) {
            refundMutation.mutate(id);
        }
    };

    return (
        <Box p={2}>
            {isLoading ? (
                <Typography>Loading donations...</Typography>
            ) : donations.length === 0 ? (
                <Typography>No donations found.</Typography>
            ) : (
                <MuiTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pet Image</TableCell>
                            <TableCell>Pet Name</TableCell>
                            <TableCell>Donated Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                                {donations.map(({ _id, petName, petImage, amount, status }) => (
                            <TableRow key={_id}>
                                <TableCell>
                                    <Avatar src={petImage} alt={petName} />
                                </TableCell>
                                <TableCell>{petName}</TableCell>
                                        <TableCell>${amount?.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Box display="flex" flexDirection="column" gap="5px" width="fit-content">
                                                <Typography
                                                    sx={{
                                                        border: "1px solid green",
                                                        padding: "4px 8px",
                                                        borderRadius: "4px",
                                                        width: "fit-content",
                                                    }}
                                                >
                                                    {status}
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleRefund(_id)}
                                                    disabled={status === "refunded" || refundMutation.isLoading}
                                                >
                                                    Ask for Refund
                                                </Button>
                                            </Box>
                                        </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            )}
        </Box>
    );
};

export default My_Donation;
