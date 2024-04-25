import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleLogin() {
    try {
      const response = await fetch("https://localhost:7111/login", {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
      }
    } catch {}
  }
}
