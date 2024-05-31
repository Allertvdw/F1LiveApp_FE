import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/authentication/AuthContext";
import Home from "./components/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import DriverOverview from "./components/DriverOverview";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Chat from "./components/Chat";
import PrivateRoute from "./components/authentication/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/driverOverview" element={<DriverOverview />} />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer stacked position={"top-center"} />
    </>
  );
}

export default App;
