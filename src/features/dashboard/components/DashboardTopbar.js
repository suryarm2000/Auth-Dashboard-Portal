import { Avatar, Box, IconButton, InputAdornment, Menu, MenuItem, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardTopbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const displayName = user?.fullName || user?.email || "User";
    const avatarLetter = displayName.charAt(0).toUpperCase();

    function handleOpenMenu(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <Box
            sx={{
                height: "64px",
                borderBottom: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 4,
                bgcolor: "white",
                position: "sticky",
                top: 0,
                zIndex: 100
            }}
        >

            <Typography variant="h5" fontWeight={700} color="#1E3A8A">
                AdminPortal
            </Typography>

            <TextField
                size="small"
                placeholder="Search..."
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" sx={{ color: "#94A3B8" }} />
                            </InputAdornment>
                        )
                    }
                }}
                sx={{
                    width: "280px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        bgcolor: "#F8FAFC",
                        "& fieldset": { borderColor: "#E2E8F0" }
                    }
                }}
            />
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton>
                    <NotificationsNoneIcon sx={{ color: "#64748B" }} />
                </IconButton>

                <Box
                    onClick={handleOpenMenu}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        px: 1,
                        py: 0.5,
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#F8FAFC" }
                    }}
                >
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "#1E3A8A",
                            fontSize: "0.85rem"
                        }}
                    >
                        {avatarLetter}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500} color="#1E293B">
                        {displayName}
                    </Typography>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >   
                    <MenuItem disabled sx={{ py: 1 }}>
                        <Typography variant="body2">Help</Typography>
                    </MenuItem>
                    <MenuItem disabled sx={{ py: 1 }}>
                        <Typography variant="body2">Language</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
                        <Typography variant="body2">Sign out</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}

export default DashboardTopbar;