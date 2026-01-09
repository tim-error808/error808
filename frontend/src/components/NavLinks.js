import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useState } from "react";
import { CgProfile, CgChevronRight, CgChevronDown } from "react-icons/cg";

const NavLinks = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    handleClick();
    setLoggedOut(true);
  };

  return (
    <>
      {loggedOut && (
        <div className="auth-done-popup">
          <h1 className="auth-done-text">Log Out Successful!</h1>
          <button className="auth-done-btn" onClick={() => setLoggedOut(false)}>
            Ok
          </button>
        </div>
      )}
      <div className="nav-links">
        <div className="dropdown">
          <button onClick={handleClick} className="dropdown-button">
            <span>
              <CgProfile />
            </span>
            <div className="dropdown-button-text-desktop">
              {isAuthenticated ? user.username : "My Account"}
            </div>
            <span>
              {!isClicked && <CgChevronRight />}
              {isClicked && <CgChevronDown />}
            </span>
          </button>
          <div
            className={
              isClicked
                ? "dropdown-content-active"
                : "dropdown-content-inactive"
            }
          >
            <Link
              onClick={handleClick}
              to={!isAuthenticated ? "/auth" : "/listings/my"}
            >
              My Games
            </Link>
            <Link
              onClick={handleClick}
              to={!isAuthenticated ? "/auth" : "/listings/new"}
            >
              Post Game
            </Link>
            <Link
              onClick={handleClick}
              to={!isAuthenticated ? "/auth" : "/offers"}
            >
              Received Offers
            </Link>
            <Link onClick={handleClick} to={!isAuthenticated ? "/auth" : "/"}>
              My Offers
            </Link>
            {isAuthenticated && (
              <>
                <Link onClick={handleClick} to="/profile">
                  View Profile
                </Link>
                <Link onClick={handleLogout} to="/">
                  Log Out
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <Link onClick={handleClick} to="/auth">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavLinks;
