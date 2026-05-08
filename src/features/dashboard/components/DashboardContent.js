import UsersTable from "../sections/UsersPage";
import SavedUsersPage from "../sections/SavedUsersPage";
import OverviewPage from "../sections/OverviewPage";
import SettingsPage from "../sections/SettingsPage";

function DashboardContent({ activeSection, savedUsers, onSaveUsers }) {
    if (activeSection === "overview") return <OverviewPage savedUsers={savedUsers} />;
    if (activeSection === "users") return <UsersTable onSaveUsers={onSaveUsers} />;
    if (activeSection === "saved") return <SavedUsersPage savedUsers={savedUsers} onSaveUsers={onSaveUsers} />;
    if (activeSection === "settings") return <SettingsPage savedUsers={savedUsers} onSaveUsers={onSaveUsers} />
}

export default DashboardContent;