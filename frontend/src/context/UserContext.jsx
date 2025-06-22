import { createContext, useState, useEffect } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    });

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    return(
        <UserContext.Provider value={{ user, login, logout}}>
            {children}
        </UserContext.Provider>
    );

}