import { useNavigate } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function checkLoginStatus() {
      const authData = localStorage.getItem("auth");
      if (authData) {
        const { accessToken } = JSON.parse(authData);
        try {
          const decodedToken = jwtDecode(accessToken);
          if (decodedToken.expiresIn * 1000 > Date.now()) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    }

    checkLoginStatus();
  }, []);

  async function Register(email, username, password) {
    const response = await fetch("https://localhost:7111/api/Auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status === 200) {
      console.log("Registration successful.");
    }
  }

  async function Login(username, password) {
    const response = await fetch("https://localhost:7111/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
        })
      );

      setIsLoggedIn(true);
      console.log("Login successful.");
    }
  }

  async function Logout() {
    localStorage.removeItem("auth");

    setIsLoggedIn(false);
    console.log("Logout successful.");
  }

  return (
    <AuthContext.Provider value={{ Register, Login, Logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
