import { Box, Stack, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
    { label: "Overview", key: "overview", icon: <DashboardIcon /> },
    { label: "Users", key: "users", icon: <PeopleIcon /> },
    { label: "Saved", key: "saved", icon: <BookmarkIcon /> },
    { label: "Settings", key: "settings", icon: <SettingsIcon /> },
];

function DashboardSidebar({ activeSection, setActiveSection }) {
    return (
        <Box
            sx={{
                width: "220px",
                minHeight: "100vh",
                borderRight: "1px solid #E2E8F0",
                py: 4,
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}
        >
            <Stack spacing={0.5}>
                {navItems.map((item) => {
                    const isActive = activeSection === item.key;
                    return (
                        <Box
                            key={item.key}
                            onClick={() => setActiveSection(item.key)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2.5,
                                px: 2.5,
                                py: 1.5,
                                borderRadius: 2,
                                cursor: "pointer",
                                bgcolor: isActive ? "#EEF2FF" : "transparent",
                                color: isActive ? "#1E3A8A" : "#64748B",
                                fontWeight: isActive ? 600 : 400,
                                transition: "all 0.15s ease",
                                "&:hover": {
                                    bgcolor: isActive ? "#EEF2FF" : "#F8FAFC",
                                    color: "#1E3A8A"
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    color: isActive ? "#1E3A8A" : "#94A3B8",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Typography
                                variant="body1"
                                fontWeight={isActive ? 600 : 400}
                                color="inherit"
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}

export default DashboardSidebar;