import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import { useState } from "react";
import { CgProfile, CgChevronRight, CgChevronDown } from "react-icons/cg";

const NavLinks = () => {
  const { user } = useAuth();
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
          My Account
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
          <Link onClick={handleClick} to={!user.identifier ? "/login" : "/"}>
            My Games
          </Link>
          <Link onClick={handleClick} to={!user.identifier ? "/login" : "/"}>
            Post a Game
          </Link>
          <Link onClick={handleClick} to={!user.identifier ? "/login" : "/"}>
            Received Offers
          </Link>
          <Link onClick={handleClick} to={!user.idenifier ? "/login" : "/"}>
            My Offers
          </Link>
          {user.identifier && (
            <Link onClick={handleClick} to="/">
              Edit Profile
            </Link>
          )}
          {!user.identifier && (
            <Link onClick={handleClick} to="/login">
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
