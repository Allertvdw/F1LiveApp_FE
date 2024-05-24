import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";

function AuthContext() {
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
    //navigate("/login");
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

    await response.json();

    localStorage.setItem(
      "auth",
      JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      })
    );

    console.log("Login successful.");
    ToastNotification("success", "Login successful.");
    //navigate("/driverOverview");
  }

  async function Logout() {
    localStorage.removeItem("refreshToken");
    console.log("Logout successful.");
    //navigate("/login");
  }
}

export default AuthContext;
