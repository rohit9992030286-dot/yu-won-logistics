import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext for managing authentication
const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for user in local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // Dummy authentication logic
        const defaultAdminUser = { username: 'admin', password: 'admin123', role: 'admin' };
        if (username === defaultAdminUser.username && password === defaultAdminUser.password) {
            setUser(defaultAdminUser);
            localStorage.setItem('user', JSON.stringify(defaultAdminUser));
        } else {
            alert('Invalid credentials!');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => user !== null;

    const hasRole = (role) => user?.role === role;

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
