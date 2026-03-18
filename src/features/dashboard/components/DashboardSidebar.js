import { Box, Button, Stack } from "@mui/material";

function DashboardSidebar({activeSection, setActiveSection}){
    return(
        <Box>
            <Stack spacing={3} px={2}>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setActiveSection("users")}
                >
                    Users
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setActiveSection("saved")}
                >
                    Saved
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setActiveSection("settings")}
                >
                    Settings
                </Button>
            </Stack>
        </Box>
    )
}

export default DashboardSidebar;