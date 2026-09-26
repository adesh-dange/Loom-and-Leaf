"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "loom-leaf-user";

const DEMO_USER = {
  id: "user-demo",
  name: "Loom & Leaf User",
  email: "user@loomandleaf.com",
  phone: "",
  avatar: "/images/avatars/default.jpg",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Please enter your email and password.",
      };
    }

    const loggedInUser = {
      ...DEMO_USER,
      email,
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return {
      success: true,
      user: loggedInUser,
      message: "Login successful.",
    };
  }, []);

  const register = useCallback((name, email, password) => {
    if (!name || !email || !password) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must contain at least 6 characters.",
      };
    }

    const registeredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone: "",
      avatar: "/images/avatars/default.jpg",
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(registeredUser)
    );

    setUser(registeredUser);

    return {
      success: true,
      user: registeredUser,
      message: "Account created successfully.",
    };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;

      const updatedUser = {
        ...currentUser,
        ...updates,
      };

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  }, []);

  const isAuthenticated = Boolean(user);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,

      login,
      register,
      logout,
      updateUser,
    }),
    [
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      updateUser,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside an AuthProvider"
    );
  }

  return context;
}

export default AuthContext;