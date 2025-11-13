import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      console.error("Authentication error:", error);
      navigate("/auth");
      return;
    }

    const jwt = params.get("jwt");
    if (jwt) {
      Cookies.set("jwt", jwt, { expires: 7, sameSite: "Strict" });
    }

    navigate("/");
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default AuthCallback;
