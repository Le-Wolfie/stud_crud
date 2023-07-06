import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const AuthenticateContext = createContext();

export const AuthenticateProvider = ({ children }) => {
  const [authenticate, setAuthenticate] = useLocalStorage(
    "thisistotallynotimportant",
    false
  );

  async function login(adminObj) {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminObj),
    });
    const data = await res.json();
    if (data.message === "No such user") {
      alert("Liar! You are not an admin!");
    } else if (data.message === "Wrong password") {
      alert("Wrong password!");
    } else {
      setAuthenticate(true);
      return true;
    }
    return false;
  }

  return (
    <AuthenticateContext.Provider value={{ authenticate, login }}>
      {children}
    </AuthenticateContext.Provider>
  );
};
