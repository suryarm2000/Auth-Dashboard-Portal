import {
    Box, Table, TableBody, TableCell, TableContainer, TablePagination,
    Checkbox, TableHead, TableRow, TextField, Button, Skeleton,
    Typography, Stack, Snackbar, Alert
} from "@mui/material";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";

function UsersTable({ onSaveUsers }) {

    const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=100&skip=0");
    const userData = data?.users ?? [];

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false });

    const filteredUsers = userData.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const paginatedUsers = filteredUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const allOnPageSelected = paginatedUsers.length > 0 && paginatedUsers.every(
        (user) => selectedUsers.some((s) => s.id === user.id)
    );

    function handleChangePage(e, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(e) {
        setRowsPerPage(Number(e.target.value, 10));
        setPage(0);
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
        setPage(0);
    }

    function handleCheckboxChange(user) {
        const alreadySelected = selectedUsers.some((s) => s.id === user.id);
        if (alreadySelected) {
            setSelectedUsers(selectedUsers.filter((s) => s.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    }

    function handleSelectAll() {
        if (allOnPageSelected) {
            setSelectedUsers(selectedUsers.filter(
                (s) => !paginatedUsers.some((u) => u.id === s.id)
            ));
        } else {
            const newOnes = paginatedUsers.filter(
                (u) => !selectedUsers.some((s) => s.id === u.id)
            );
            setSelectedUsers([...selectedUsers, ...newOnes]);
        }
    }

    function handleSave() {
        if (selectedUsers.length === 0) return;
        onSaveUsers(selectedUsers);
        setSnackbar({ open: true });
    }

    function handleCloseSnackbar() {
        setSnackbar({ open: false });
    }

    if (loading) {
        return (
            <Box>
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2, borderRadius: 1 }} />
                {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={52} sx={{ mb: 1, borderRadius: 1 }} />
                ))}
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography color="error" variant="body1">
                    Failed to load users. Please try again.
                </Typography>
            </Box>
        );
    }

    return (
        <Box pb={6}>

            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={600} color="#1E293B">
                    Users
                    <Typography component="span" variant="body2" color="#94A3B8" ml={1}>
                        ({filteredUsers.length} total)
                    </Typography>
                </Typography>
                <Button
                    variant="contained"
                    disabled={selectedUsers.length === 0}
                    onClick={handleSave}
                    sx={{ bgcolor: "#1E3A8A", textTransform: "none", borderRadius: 2 }}
                >
                    Save {selectedUsers.length > 0 ? `(${selectedUsers.length})` : ""}
                </Button>
            </Stack>

            <TextField
                label="Search name"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ mb: 2, width: "280px" }}
            />

            <TableContainer sx={{ border: "1px solid #E2E8F0", borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={allOnPageSelected}
                                    onChange={handleSelectAll}
                                    indeterminate={
                                        !allOnPageSelected &&
                                        paginatedUsers.some((u) => selectedUsers.some((s) => s.id === u.id))
                                    }
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    bgcolor: selectedUsers.some((s) => s.id === row.id) ? "#EEF2FF" : "white"
                                }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedUsers.some((s) => s.id === row.id)}
                                        onChange={() => handleCheckboxChange(row)}
                                    />
                                </TableCell>
                                <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.address.city}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredUsers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""} saved successfully
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default UsersTable;