import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import logo from "../img/logo.svg";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-title">
        <img src={logo} alt="logo" />
        <Link to="/" className="page-title">
          Naslov
        </Link>
      </div>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
