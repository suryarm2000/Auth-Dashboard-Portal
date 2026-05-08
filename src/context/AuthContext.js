import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }){

    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;  
    });

    function login(userData){
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    function logout(){
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("savedUsers");
    }

    function updateUser(updatedData) {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    }

    return(
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };