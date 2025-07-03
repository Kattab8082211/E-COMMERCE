import React, { createContext, useState } from "react";

// 1. إنشاء الـ Context
export const AuthContext = createContext();

// 2. Provider
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idUser, setidUser] = useState(localStorage.getItem("id"));

  return (
    <AuthContext.Provider value={{ token, idUser, setToken, setidUser }}>
      {children}
    </AuthContext.Provider>
  );
}
