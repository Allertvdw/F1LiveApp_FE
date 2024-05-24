import { useNavigate } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";
import { createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  async function Register(email, username, password) {
    const response = await fetch("https://localhost:7111/api/Auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      console.error("Registration failed.");
      ToastNotification("error", "Registration failed.");
      navigate("/login");
      return;
    }

    console.log("Registration successful.");
    ToastNotification("success", "Registration successful.");
  }

  async function Login(username, password) {
    const response = await fetch("https://localhost:7111/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.error("Login failed.");
      ToastNotification("error", "Login failed.");
      navigate("/login");
      return;
    }

    const data = await response.json();

    localStorage.setItem(
      "auth",
      JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      })
    );
  }

  async function Logout() {
    localStorage.removeItem("auth");
    console.log("Logout successful.");
  }

  return (
    <AuthContext.Provider value={{ Register, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
