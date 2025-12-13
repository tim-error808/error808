import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";
import ModelConfig from "../config/ModeConfig";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const { apiUri } = ModelConfig();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.error("Error fetching user data:", error.response.data.status);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loginWithGoogle = () => {
    window.location.href = `${apiUri}/auth/google`;
  };

  const logout = () => {
    api
      .post("/auth/logout")
      .then((response) => {
        if (response.status === 200) {
          setUser(null);
          console.log(response.data.message);
        } else {
          console.error("Failed to logout, status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error.response.data.status);
      });
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
