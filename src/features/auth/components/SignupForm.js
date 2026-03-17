import { Box, Button, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { validateSignup } from "../utils/authValidation";

function SignupForm(){

    const [formValues, setFormValues] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({})

    function handleChange(e){
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setFormValues((prev) => ({
            ...prev,
            [name] : value
        }))
        setErrors((prev) => ({
            ...prev,
            [name] : ""
        }))
    }

    function handleTogglePassword(){
        setShowPassword((prev) => !prev);
    }

    function handleToggleConfirmPassword(){
        setShowConfirmPassword((prev) => !prev);
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const newErrors = validateSignup(formValues);
        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0){
            return;
        }

        console.log("Account created - Details: ", formValues);
    }

    return(
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                bgcolor: "white",
                px: "15%",
                pt: "5%",
                pb: "7%"
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    mb: 4
                }}
            >
                <Typography variant="h5" sx={{color: "#1E3A8A"}}>
                    Create Your Account
                </Typography>
                <Typography variant="body2" sx={{color: "#667085"}} >
                    Enter your details to get started
                </Typography>
            </Box>
            <Stack spacing={1.5}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Full Name"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName || " "}
                    slotProps={{
                        input:{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <PersonIcon color="action"/>
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email || " "}
                    slotProps={{
                        input:{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <EmailIcon color="action" />
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    type={showPassword? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password || " "}
                    slotProps={{
                        input:{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <HttpsIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment>
                                    <IconButton
                                        edge="end"
                                        onClick={handleTogglePassword}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword? (
                                            <VisibilityIcon color="action" />
                                        ):(
                                            <VisibilityOffIcon color="action" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    type={showConfirmPassword? "text" : "password"}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword || " "}
                    slotProps={{
                        input:{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <HttpsIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment>
                                    <IconButton
                                        edge="end"
                                        onClick={handleToggleConfirmPassword}
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirmPassword? (
                                            <VisibilityIcon color="action"/>
                                        ):(
                                            <VisibilityOffIcon color="action"/>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <Stack spacing={3}>
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{
                            textTransform: "none",
                            bgcolor: "#1E3A8A"
                        }}
                    >
                        Create Account
                    </Button>
                    <Divider sx={{color: "text.secondary"}}>
                        Or continue with
                    </Divider>
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: "stretch"
                    }}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<GoogleIcon />}
                        aria-label="Continue with Google"
                        sx={{
                            textTransform: "none",
                            bgcolor: "white",
                            borderRadius: 2,
                            borderColor: "#DADCE0",
                            color: "#3C4043",
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 0.4
                        }}
                    >
                        Google
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<MicrosoftIcon />}
                        aria-label="Continue with Microsoft"
                        sx={{
                            textTransform: "none",
                            bgcolor: "white",
                            color: "#1F1F1F",
                            borderRadius: 2,
                            borderColor: "#D0D0D0",
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 0.4
                        }}
                    >
                        Microsoft
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SignupForm;