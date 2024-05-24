import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";
import { useAuth } from "../authentication/AuthContext";

function Login() {
  const { Login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await Login(username, password);
      console.log("Login successful.");
      ToastNotification("success", "Login successful.");
      navigate("/driverOverview");
    } catch (error) {
      console.error("Error during login:", error);
      ToastNotification("error", "Error during login.");
      navigate("/login");
    }
  }

  // async function checkAuthentication() {
  //   const token = localStorage.getItem("accessToken");

  //   if (!token) {
  //     console.error("Access token not found");
  //     isAuthenticated = false;
  //     return;
  //   }

  //   try {
  //     const response = await fetch("https://localhost:7111/api/user/info", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 401) {
  //       isAuthenticated = false;
  //       return;
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     isAuthenticated = false;
  //     return;
  //   }
  // }

  // async function refreshToken() {
  //   const refreshToken = localStorage.getItem("refreshToken");

  //   if (!refreshToken) {
  //     console.error("Refresh token not found");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("https://localhost:7111/refresh", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ refreshToken }),
  //     });

  //     if (!response.ok) {
  //       console.error("Failed to refresh access token");
  //       isAuthenticated = false;
  //       return;
  //     }

  //     const data = await response.json();
  //     localStorage.setItem("accessToken", data.accessToken);
  //   } catch (error) {
  //     console.error("Failed to refresh access token", error);
  //     isAuthenticated = false;
  //   }
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    await handleLogin().then((r) => r);
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Username"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
