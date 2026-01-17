import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useState } from "react";
import { CgProfile, CgChevronRight, CgChevronDown } from "react-icons/cg";
import ModeConfig from "../config/ModeConfig";

const NavLinks = () => {
  const { apiUri } = ModeConfig();
  const { isAuthenticated, user, logout } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  let imgUrl;

  if (user?.googleId) {
    imgUrl = user?.profile?.photoUrl;
  } else if (user?.profile?.photoUrl) {
    imgUrl = `${apiUri}${user?.profile?.photoUrl}`;
  } else {
    imgUrl = "/default-avatar.png";
  }

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
        <NavLink end={true} className="nav-link" to="/listings">
          Browse All Games
        </NavLink>
        <NavLink end={true} className="nav-link" to="/listings/my">
          My Games
        </NavLink>
        <NavLink end={true} className="nav-link" to="/listings/new">
          Make New Listing
        </NavLink>
        <NavLink end={true} className="nav-link" to="/offers">
          Received Offers
        </NavLink>
        <NavLink end={true} className="nav-link" to="/offers/my">
          My Offers
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink end={true} className="nav-link profile" to="/profile">
              <img src={imgUrl} alt={user.username} />
            </NavLink>
            <button onClick={handleLogout} className="nav-special">
              Log out
            </button>
          </>
        ) : (
          <NavLink end={true} className="nav-link nav-special" to="/auth">
            Log In
          </NavLink>
        )}
      </div>

      <div className="dropdown">
        {isAuthenticated && (
          <NavLink end={true} className="nav-link profile" to="/profile">
            <img src={imgUrl} alt={user.username} />
          </NavLink>
        )}
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
            isClicked ? "dropdown-content-active" : "dropdown-content-inactive"
          }
        >
          <Link onClick={handleClick} to="/listings">
            Browse All Games
          </Link>
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
            Make New Listing
          </Link>
          <Link
            onClick={handleClick}
            to={!isAuthenticated ? "/auth" : "/offers"}
          >
            Received Offers
          </Link>
          <Link
            onClick={handleClick}
            to={!isAuthenticated ? "/auth" : "/offers/my"}
          >
            My Offers
          </Link>
          {isAuthenticated && (
            <Link onClick={handleLogout} to="/">
              Log Out
            </Link>
          )}
          {!isAuthenticated && (
            <Link onClick={handleClick} to="/auth">
              Log In
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavLinks;
