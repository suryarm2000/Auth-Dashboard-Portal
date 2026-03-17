import { Box, Stack } from "@mui/material";
import { useState } from "react";
import AuthSidePanel from "../features/auth/components/AuthSidePanel";
import LoginForm from "../features/auth/components/LoginForm";
import SignupForm from "../features/auth/components/SignupForm";

function AuthPage(){

    const [showLogin, setShowLogin] = useState(true);

    function handleToggleLogin(){
        setShowLogin((prev) => !prev);
    }

    return(
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#E8F0FF",
                minHeight: "100vh"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1000,
                    minHeight: 550,
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid #1E3A8A14",
                    boxShadow: "0 12px 32px #0F172A1F, 0 4px 12px #0F172A14"
                }}
            >
                <Stack
                    direction="row"
                >
                    <Box sx={{flex: "55%", borderRight: "1px solid #E2E8F0"}} >
                        <AuthSidePanel isLoginView={showLogin} onClick={handleToggleLogin} />
                    </Box>
                    <Box sx={{flex: "45%"}} >
                        {showLogin? <LoginForm /> : <SignupForm />}
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default AuthPage;