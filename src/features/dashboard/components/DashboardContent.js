import { Box } from "@mui/material";
import UsersTable from "../sections/UsersPage";
import SavedUsersPage from "../sections/SavedUsersPage";
import OverviewPage from "../sections/OverviewPage";

function DashboardContent({ activeSection, savedUsers, onSaveUsers }) {
    if (activeSection === "overview") return <OverviewPage savedUsers={savedUsers} />;
    if (activeSection === "users") return <UsersTable onSaveUsers={onSaveUsers} />;
    if (activeSection === "saved") return <SavedUsersPage savedUsers={savedUsers} onSaveUsers={onSaveUsers} />;
    if (activeSection === "settings") return <Box>Settings coming soon</Box>;
}

export default DashboardContent;