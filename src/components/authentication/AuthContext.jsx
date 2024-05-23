import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
      console.error("Register failed.");
      ToastNotification("error", "Registration unsuccessful.");
      navigate("/login");
      return;
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

    if (!response.ok) {
      console.error("Login failed.");
      ToastNotification("error", "Login unsuccessful.");
      navigate("/login");
      return;
    }

    await response.json();
  }

  async function Logout() {
    Cookies.remove("refreshToken");
    navigate("/login");
  }
}
