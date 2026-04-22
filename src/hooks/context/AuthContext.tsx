/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";


const AuthContext = createContext<any>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        checkAuthStatus();
    }, [])

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");
            if (token && userStr) {
                const userData = JSON.parse(userStr);
                setUser(userData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            logout();
        } finally {
            setLoading(false);
        }
    }

    const login = (userData: any) => {
        const fakeToken = `fakeToken-${Math.random().toString(36).substring(2)}`;

        localStorage.setItem("token", fakeToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setIsAuthenticated(false);
        window.location.href = "/";
    }

    const updateUser = (updatedData: any) => {
        const newUserData = { ...user, ...updatedData };
        localStorage.setItem("user", JSON.stringify(newUserData));
        setUser(newUserData);
    }

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        checkAuthStatus,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}