import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const AuthCallback = () => {
  const { isAuthenticated, user, error } = useAuth();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setIsSuccessful(true);
    }
  }, [isAuthenticated]);

  if (isSuccessful) {
    return (
      <div className="auth-done-page">
        <h1 className="auth-done-text-google">Log In Successful!</h1>
        <h2>Welcome {user.username}!</h2>
        <button
          className="auth-done-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Go To Front Page
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-done-page">
        <h1 className="auth-done-text-google">Log In Failed!</h1>
        <h2>{error}</h2>
        <button
          className="auth-done-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Go To Front Page
        </button>
      </div>
    );
  }

  return <p className="loader">Signing you in…</p>;
};

export default AuthCallback;
