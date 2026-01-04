import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const isAuthenticated = !!user;

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get("/user");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const loginWithGoogle = () => {
    window.location.href = `${apiUri}/auth/google`;
  };

  const login = async ({ identifier, password }) => {
    try {
      const result = await api.post("/auth/login", { identifier, password });
      await fetchUser();
      setJustLoggedIn(true);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const signup = async ({ username, email, password }) => {
    try {
      const result = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      await fetchUser();
      return result;
    } catch (error) {
      throw error;
    }
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
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        justLoggedIn,
        setJustLoggedIn,
        fetchUser,
        loginWithGoogle,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
