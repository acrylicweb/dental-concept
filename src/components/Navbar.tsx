import { NavLink } from "react-router";

function Navbar() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/treatments">Treatments</NavLink>
        <NavLink to="/treatments/invisalign">Invisalign</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
