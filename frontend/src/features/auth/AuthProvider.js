import { createContext, useContext, useState, useEffect } from "react";
import api from "../../api/api";
import Cookies from "js-cookie";
import ModelConfig from "../../config/ModeConfig";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const { apiUri } = ModelConfig();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/user")
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Failed to fetch user data, status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const loginWithGoogle = () => {
    window.location.href = `${apiUri}/auth/google`;
  };

  const login = (userData) => setUser(userData);
  const signUp = (userData) => setUser(userData);
  const logout = () => {
    Cookies.remove("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginWithGoogle, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
