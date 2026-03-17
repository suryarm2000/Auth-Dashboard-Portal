const emailRegex = /^[A-Za-z0-9_.+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

function validateLogin(values){
    const errors = {}

    if(!values.email.trim()){
        errors.email = "Email is required";
    } else if(!emailRegex.test(values.email)){
        errors.email = "Enter a valid email";
    }
    if(!values.password){
        errors.password = "Password is required";
    } else if(values.password.length < 8){
        errors.password = "Password must be at least 8 characters";
    }
    return errors;
}

function validateSignup(values){
    const errors = {}

    if(!values.fullName.trim()){
        errors.fullName = "Full Name is required";
    }
    if(!values.email.trim()){
        errors.email = "Email is required";
    } else if(!emailRegex.test(values.email)){
        errors.email = "Enter a valid email";
    }
    if(!values.password){
        errors.password = "Password is required";
    } else if(values.password.length < 8){
        errors.password = "Password must be at least 8 characters";
    }
    if(!values.confirmPassword){
        errors.confirmPassword = "Confirm your password";
    } else if(values.confirmPassword !== values.password){
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
}

export {validateLogin, validateSignup};