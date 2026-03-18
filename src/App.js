import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashbooardPage";

function App(){
    return(
        <Routes>
            <Route path="/" element={<AuthPage />}/>
            <Route path="/dashboard" element={<DashboardPage />}/>
        </Routes>
    )
}

export default App;