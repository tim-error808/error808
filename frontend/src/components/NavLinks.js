import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import { useState } from "react";
import { CgProfile, CgChevronRight, CgChevronDown } from "react-icons/cg";

const NavLinks = () => {
  const { user, logout } = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="nav-links">
      <div className="dropdown">
        <button onClick={handleClick} className="dropdown-button">
          <span>
            <CgProfile />
          </span>
          <div className="dropdown-button-text-desktop">My Account</div>
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
          <Link onClick={handleClick} to={!user?.email ? "/auth" : "/"}>
            My Games
          </Link>
          <Link onClick={handleClick} to={!user?.email ? "/auth" : "/"}>
            Post a Game
          </Link>
          <Link onClick={handleClick} to={!user?.email ? "/auth" : "/"}>
            Received Offers
          </Link>
          <Link onClick={handleClick} to={!user?.email ? "/auth" : "/"}>
            My Offers
          </Link>
          {user?.email && (
            <>
              <Link onClick={handleClick} to="/">
                Edit Profile
              </Link>
              <Link onClick={logout} to="/">
                Log Out
              </Link>
            </>
          )}
          {!user?.email && (
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
