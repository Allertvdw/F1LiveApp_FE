import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DriverOverview from "./components/DriverOverview";
import RegisterLogin from "./components/RegisterLogin";
import { AuthProvider } from "./components/authentication/AuthContext";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/driverOverview" element={<DriverOverview />} />
            <Route path="/registerLogin" element={<RegisterLogin />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer stacked position={"top-center"} />
    </>
  );
}

export default App;
