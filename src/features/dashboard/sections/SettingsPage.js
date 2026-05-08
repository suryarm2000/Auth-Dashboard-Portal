import {
    Box, Typography, TextField, Button, Divider, Stack, Snackbar, Alert
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function SettingsPage({ savedUsers, onSaveUsers }) {

    const { user, updateUser } = useAuth();

    const [fullName, setFullName] = useState(user?.fullName || "");
    const [snackbar, setSnackbar] = useState({ 
        open: false, 
        message: "", 
        severity: "success" 
    });

    function handleNameChange(e) {
        setFullName(e.target.value);
    }

    function handleSaveProfile(e) {
        e.preventDefault();
        updateUser({ fullName });
        setSnackbar({ open: true, message: "Profile saved successfully", severity: "success" });
    }

    function handleClearSaved() {
        onSaveUsers([]);
        setSnackbar({ open: true, message: "Saved users cleared", severity: "info" });
    }

    function handleCloseSnackbar() {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }

    return (
        <Box sx={{ maxWidth: 560 }}>
            <Typography variant="h6" fontWeight={600} color="#1E293B" mb={4}>
                Settings
            </Typography>

            {/* Profile Section */}
            <Box
                component="form"
                onSubmit={handleSaveProfile}
                sx={{
                    border: "1px solid #E2E8F0",
                    borderRadius: 3,
                    p: 3,
                    mb: 3
                }}
            >
                <Typography variant="body1" fontWeight={600} color="#1E293B" mb={0.5}>
                    Profile
                </Typography>
                <Typography variant="body2" color="#94A3B8" mb={3}>
                    Update your display name
                </Typography>

                <Stack spacing={2.5}>
                    <TextField
                        label="Email"
                        value={user?.email || ""}
                        size="small"
                        fullWidth
                        disabled
                        helperText="Email cannot be changed"
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#94A3B8"
                            }
                        }}
                    />
                    <TextField
                        label="Full Name"
                        value={fullName}
                        onChange={handleNameChange}
                        size="small"
                        fullWidth
                        placeholder="Enter your name"
                    />
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                bgcolor: "#1E3A8A",
                                textTransform: "none",
                                borderRadius: 2
                            }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Saved Users Section */}
            <Box
                sx={{
                    border: "1px solid #E2E8F0",
                    borderRadius: 3,
                    p: 3
                }}
            >
                <Typography variant="body1" fontWeight={600} color="#1E293B" mb={0.5}>
                    Saved Users
                </Typography>
                <Typography variant="body2" color="#94A3B8" mb={3}>
                    You currently have {savedUsers.length} saved {savedUsers.length === 1 ? "user" : "users"}
                </Typography>

                <Button
                    variant="outlined"
                    disabled={savedUsers.length === 0}
                    onClick={handleClearSaved}
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        color: "#EF4444",
                        borderColor: "#EF4444",
                        "&:hover": {
                            bgcolor: "#FEF2F2",
                            borderColor: "#EF4444"
                        },
                        "&.Mui-disabled": {
                            borderColor: "#E2E8F0",
                            color: "#CBD5E1"
                        }
                    }}
                >
                    Clear All Saved Users
                </Button>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default SettingsPage;