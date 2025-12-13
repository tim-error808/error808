import React from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const RequireAuth = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PulseLoader color="#FFF" className="loader" />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
