import { Box } from "@mui/material";
import UsersTable from "./UsersTable";

function DashboardContent({activeSection}){

    let toShow = "Dashboard";

    if(activeSection === "users"){
        toShow = <UsersTable />
    }else if(activeSection === "saved"){
        toShow = "Saved Component"
    }else if(activeSection === "settings"){
        toShow = "Settings Component"
    }

    return(
        <Box>
            {toShow}
        </Box>
    )
}

export default DashboardContent;