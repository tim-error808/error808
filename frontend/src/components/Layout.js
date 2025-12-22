import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/AuthProvider";
import PulseLoader from "react-spinners/PulseLoader";

const Layout = () => {
  const { loading } = useAuth();

  if (loading)
    return (
      <div className="loader">
        <PulseLoader color="#000" />
      </div>
    );

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
