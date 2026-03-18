import { Box } from "@mui/material"
import DashboardContent from "../features/dashboard/components/DashboardContent";
import DashboardSidebar from "../features/dashboard/components/DashboardSidebar";
import { useState } from "react";

function DashboardPage(){

    const [activeSection, setActiveSection] = useState("users");

    return(
        <Box
            sx={{
                display: "flex", 
                minHeight: "100vh",
                px: "5%",
                pt: "5%",
                gap: 5
            }}
        >
            <Box sx={{width: "240px"}}>
                <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            </Box>
            <Box sx={{flex: 1}}>
                <DashboardContent activeSection={activeSection} />
            </Box>
        </Box>
    )
}

export default DashboardPage;