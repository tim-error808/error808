import { useAuth } from "../../hooks/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const PublicOnly = () => {
  const { isAuthenticated, loading, justLoggedIn } = useAuth();

  if (loading) {
    return <PulseLoader color="#FFF" className="loader" />;
  }

  if (isAuthenticated && !justLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicOnly;
