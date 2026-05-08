import { Box, Button, Divider, FormControlLabel, Checkbox, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { validateLogin } from "../utils/authValidation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function LoginForm(){

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        remember: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const {login} = useAuth();

    function handleChange(e){
        const target = e.target;
        const name = target.name;
        const value = target.type === "checkbox"? target.checked : target.value;
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

    function handleSubmit(e){
        e.preventDefault();
        
        const newErrors = validateLogin(formValues);
        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0){
            return;
        }

        login({ email: formValues.email });
        navigate("/dashboard");
    }

    return(
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                bgcolor: "white",
                px: "15%",
                pt: "5%",
                pb: "8%"
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    mb: 4
                }}
            >
                <Typography variant="h5" sx={{color: "#1E3A8A"}}>
                    Welcome Back
                </Typography>
                <Typography variant="body2" sx={{color: "#667085"}} >
                    Sign in to continue
                </Typography>
            </Box>
            <Stack spacing={2}>
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
                                    <EmailIcon color="action"/>
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
                                    <HttpsIcon color="action"/>
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
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <FormControlLabel
                        label="Remember me"
                        control={
                            <Checkbox
                                name="remember"
                                checked={formValues.remember}
                                onChange={handleChange}
                                size="small"
                            />
                        }
                        slotProps={{
                            typography:{
                                variant: "body2",
                                color: "#667085"
                            }
                        }}
                    />
                    <Button
                        type="button"
                        variant="text"
                        disableRipple
                        disableElevation
                        sx={{
                            textTransform: "none",
                            bgcolor: "transparent",
                            color: "#0000EE"
                        }}
                    >
                        Forgot password?
                    </Button>
                </Stack>
                <Stack spacing={5} sx={{pb: 1}}>
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{
                            textTransform: "none",
                            bgcolor: "#1E3A8A"
                        }}
                    >
                        Sign In
                    </Button>
                    <Divider sx={{color: "text.secondary"}}>
                        Or
                    </Divider>
                </Stack>
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
                    Continue with Google
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
                    Continue with Microsoft
                </Button>
            </Stack>
        </Box>    
    )
}

export default LoginForm;