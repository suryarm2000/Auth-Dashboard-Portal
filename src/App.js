import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

function App(){
    return(
        <Routes>
            <Route path="/" element={<AuthPage />}/>
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    )
}

export default App;