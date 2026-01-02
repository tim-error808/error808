import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useState } from "react";
import { CgProfile, CgChevronRight, CgChevronDown } from "react-icons/cg";

const NavLinks = () => {
  const { user, logout } = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    handleClick();
  };

  return (
    <div className="nav-links">
      <div className="dropdown">
        <button onClick={handleClick} className="dropdown-button">
          <span>
            <CgProfile />
          </span>
          <div className="dropdown-button-text-desktop">
            {user ? user.username : "My Account"}
          </div>
          <span>
            {!isClicked && <CgChevronRight />}
            {isClicked && <CgChevronDown />}
          </span>
        </button>
        <div
          className={
            isClicked ? "dropdown-content-active" : "dropdown-content-inactive"
          }
        >
          <Link onClick={handleClick} to={!user ? "/auth" : "/"}>
            My Games
          </Link>
          <Link onClick={handleClick} to={!user ? "/auth" : "/board-games/new"}>
            Post Game
          </Link>
          <Link onClick={handleClick} to={!user?.email ? "/auth" : "/"}>
            Received Offers
          </Link>
          <Link onClick={handleClick} to={!user?.email ? "/auth" : "/"}>
            My Offers
          </Link>
          {user && (
            <>
              <Link onClick={handleClick} to="/profile">
                View Profile
              </Link>
              <Link onClick={handleLogout} to="/">
                Log Out
              </Link>
            </>
          )}
          {!user && (
            <Link onClick={handleClick} to="/auth">
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
