import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="nav-links">
      <Link to="/about">About</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default NavLinks;
