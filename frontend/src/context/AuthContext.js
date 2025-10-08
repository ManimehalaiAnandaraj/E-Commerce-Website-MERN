import React, { createContext, useContext, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // LOGIN
  const login = async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");

    const res = await axios.post("/auth/login", { email, password });
    setUser(res.data.user); // save user in context
    localStorage.setItem("authToken", res.data.token); // save token
    return res.data;
  };

  // SIGNUP
  const signup = async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");

    const res = await axios.post("/auth/signup", { email, password });
    return res.data;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
