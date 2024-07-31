import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const storedExpTime = JSON.parse(localStorage.getItem("exp_time"));

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [ses_exp, setSes_exp] = useState(false);

  const login = (userData, token, exp_time) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("exp_time", JSON.stringify(exp_time));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("exp_time");
    localStorage.removeItem("patiendDetailTab");
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

        console.log(currentTime, "currentTime");
        console.log(expirationTime, "expirationTime");

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
