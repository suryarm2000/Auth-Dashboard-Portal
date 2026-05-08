import { Box } from "@mui/material";
import DashboardTopbar from "../features/dashboard/components/DashboardTopbar";
import DashboardSidebar from "../features/dashboard/components/DashboardSidebar";
import DashboardContent from "../features/dashboard/components/DashboardContent";
import { useState } from "react";

function DashboardPage() {
    const [activeSection, setActiveSection] = useState("overview");
    const [savedUsers, setSavedUsers] = useState([]);

    function handleSaveUsers(selectedUsers) {
        setSavedUsers(selectedUsers);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <DashboardTopbar />

            <Box sx={{ display: "flex", flex: 1 }}>
                <DashboardSidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
                <Box sx={{ flex: 1, p: 4 }}>
                    <DashboardContent
                        activeSection={activeSection}
                        savedUsers={savedUsers}
                        onSaveUsers={handleSaveUsers}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardPage;