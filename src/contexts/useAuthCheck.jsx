import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const useAuthCheck = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const storedExpTime = JSON.parse(sessionStorage.getItem("expTime"));

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (user) {
        const currentTime = Date.now();
        const expirationTime = new Date(storedExpTime).getTime();

        if (currentTime >= expirationTime) {
          sessionStorage.setItem("loggedIn", "false");
          navigate("/");
          logout();
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiry, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [ storedExpTime, user]);
};
export default useAuthCheck;
