import { Box, Button, Stack, Typography } from "@mui/material";
import panelImage from "../assets/panel-image.png"

function AuthSidePanel({isLoginView, onClick}){
    return(
        <Box
            sx={{
                bgcolor: "white",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${panelImage})`,
                backgroundPosition: "center 20%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
            }}
        >
            <Stack
                spacing={1.5}
                sx={{
                    px: "15%",
                    pb: "10%",
                    alignItems: "center"
                }}
            >
                <Typography variant="h5" color="#1E3A8A" fontWeight={700}>
                    {isLoginView? "Join Us": "Welcome Back"}
                </Typography>
                <Stack 
                    direction="row" 
                    spacing={2} 
                    width="100%"
                    alignItems="center"
                >
                    <Typography variant="body1" color="#667085" sx={{whiteSpace: "nowrap"}}>
                        {isLoginView? "Don't have an account?" : "Already have an account?"}
                    </Typography>
                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        onClick={onClick}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            color: "#1E3A8A",
                            borderColor: "#1E3A8A33"
                        }}
                    >
                        {isLoginView? "Create Account" : "Sign In"}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default AuthSidePanel;