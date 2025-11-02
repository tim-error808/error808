import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="nav-links">
      <Link to="/about">About</Link>
      <Link to="/login">Log In</Link>
      <Link to="/login">Log out</Link>
    </div>
  );
};

export default NavLinks;
