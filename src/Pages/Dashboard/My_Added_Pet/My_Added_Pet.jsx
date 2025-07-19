import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const My_Added_Pet = () => {
    // Dummy pet data for now (replace with API data later)
    const [pets, setPets] = useState([
        {
            id: "1",
            name: "Buddy",
            category: "Dog",
            image:
                "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            adopted: false,
        },
        {
            id: "2",
            name: "Whiskers",
            category: "Cat",
            image:
                "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
            adopted: true,
        },
        // Add more dummy pets as needed
    ]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);

    const handleDeleteClick = (pet) => {
        setPetToDelete(pet);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        // For now, just remove locally from dummy data
        setPets((prev) => prev.filter((p) => p.id !== petToDelete.id));
        setDeleteDialogOpen(false);

        // TODO: Replace above with API call to delete pet from DB
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setPetToDelete(null);
    };

    const handleAdoptedToggle = (petId) => {
        setPets((prev) =>
            prev.map((p) =>
                p.id === petId ? { ...p, adopted: true } : p
            )
        );

        // TODO: Replace above with API call to update 'adopted' status in DB
    };

    // Table columns definition
    const columns = useMemo(
        () => [
            {
                accessorKey: "serial",
                header: "S/N",
                cell: (info) => info.row.index + 1,
            },
            {
                accessorKey: "name",
                header: "Pet Name",
            },
            {
                accessorKey: "category",
                header: "Pet Category",
            },
            {
                accessorKey: "image",
                header: "Pet Image",
                cell: (info) => (
                    <img
                        src={info.getValue()}
                        alt={info.row.original.name}
                        style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                    />
                ),
            },
            {
                accessorKey: "adopted",
                header: "Adoption Status",
                cell: (info) =>
                    info.getValue() ? "Adopted" : "Not Adopted",
            },
            {
                id: "actions",
                header: "Actions",
                cell: (info) => {
                    const pet = info.row.original;
                    return (
                        <>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                    alert(`Redirect to update page for pet id ${pet.id}`)
                                }
                                sx={{ mr: 1 }}
                            >
                                Update
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteClick(pet)}
                                sx={{ mr: 1 }}
                            >
                                Delete
                            </Button>
                            {!pet.adopted && (
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleAdoptedToggle(pet.id)}
                                >
                                    Adopted
                                </Button>
                            )}
                        </>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: pets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                My Added Pets
            </Typography>

            <MuiTable>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    sx={{ cursor: "pointer", userSelect: "none" }}
                                >
                                    {typeof header.column.columnDef.header === "function"
                                        ? header.column.columnDef.header(header.getContext())
                                        : header.column.columnDef.header}
                                    {{
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted()] ?? null}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {cell.renderCell
                                        ? cell.renderCell()
                                        : cell.getValue()}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>

            {/* Pagination controls */}
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Typography>
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </Typography>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </Box>

            {/* Delete confirmation modal */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Delete Pet</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the pet "
                        {petToDelete?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>No</Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 
        TODO when API ready:
        1. Replace dummy data `pets` state with data fetched from your backend API.
        2. Implement update navigation on Update button (using react-router or similar).
        3. Implement delete and adopted status update API calls inside handlers.
      */}
        </Box>
    );
};

export default My_Added_Pet;
