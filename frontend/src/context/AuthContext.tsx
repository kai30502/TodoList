import React, { useState, useEffect } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { id: string; username: string; email: string; created_at: string; } | null;
    login: (user: { id: string; username: string; email: string; created_at: string }) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    type User = { id: string; username: string; email: string; created_at: string } | null;
    const [user, setUser] = useState<User>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 登入驗證：元件掛載時自動檢查
    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("http://localhost:3000/api/users", {
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser({ id: data.id, username: data.username, email: data.email, created_at: data.created_at });
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);

    const login = (user: { id: string; username: string; email: string; created_at: string }) => {
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;