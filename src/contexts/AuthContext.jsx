import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const storedToken = JSON.parse(sessionStorage.getItem("token"));
  const storedExpTime = JSON.parse(sessionStorage.getItem("exp_time"));

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [ses_exp, setSes_exp] = useState(false);

  const login = (userData, token, exp_time) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("exp_time", JSON.stringify(exp_time));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("exp_time");
    sessionStorage.removeItem("patiendDetailTab");
  };

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (user && storedExpTime) {
        // const currentTime = Date.now();
        const getCurrentTimeInSeconds = () => {
          const currentTimeInMilliseconds = Date.now(); // Get current time in milliseconds
          const currentTimeInSeconds = Math.floor(
            currentTimeInMilliseconds / 1000
          ); // Convert milliseconds to seconds
          return currentTimeInSeconds;
        };

        const currentTime = getCurrentTimeInSeconds();
        const expirationTime = new Date(storedExpTime).getTime();

        if (currentTime >= expirationTime) {
          sessionStorage.setItem("loggedIn", "false");
          setSes_exp(true);
          // Optionally trigger logout and redirect
          // logout();
          // window.location.href = "/login"; // Redirect to login page
        }
      }
    };

    checkTokenExpiry(); // Check immediately on mount
    const intervalId = setInterval(checkTokenExpiry, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [user, storedExpTime]); // Include storedExpTime in dependency array

  return (
    <AuthContext.Provider value={{ user, login, logout, ses_exp, setSes_exp }}>
      {children}
    </AuthContext.Provider>
  );
};
