import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { REST_API_URI } from "../../config/CONSTANTS";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      axios
        .get("https://error808-backend-ftcqdmg7fqcsf0gp.westeurope-01.azurewebsites.net/user", {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
          } else {
            console.error(
              "Failed to fetch user data, status:",
              response.status
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const loginWithGoogle = () => {
    window.location.href = `${REST_API_URI}/auth/google`;
  };

  const login = (userData) => setUser(userData);
  const signUp = (userData) => setUser(userData);
  const logout = () => {
    Cookies.remove("jwt");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginWithGoogle, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
