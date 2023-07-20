import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : null;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
