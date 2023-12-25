import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

 const login = (newToken) => {
   setToken(newToken);
   if (newToken) {
     // Save token to AsyncStorage for persistent storage
     AsyncStorage.setItem("authToken", newToken).catch((error) =>
       console.error("Error saving token to AsyncStorage:", error)
     );
   }
 };

  const logout = () => {
    setToken(null);
    // Remove token from AsyncStorage
    AsyncStorage.removeItem("authToken").catch((error) =>
      console.error("Error removing token from AsyncStorage:", error)
    );
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 
