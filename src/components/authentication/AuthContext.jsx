import React, { createContext, useState, useContext } from "react";
import ToastNotification from "../notifications/ToastNotification";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    ToastNotification("success", "Logged in successfully.");
    console.log("Succesfully logged in.");
  };

  const logout = () => {
    setIsLoggedIn(false);
    ToastNotification("success", "Logged out successfully.");
    console.log("Succesfully logged out.");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
