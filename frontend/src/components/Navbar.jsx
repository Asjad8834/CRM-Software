import { Link, useLocation } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">🗂 CRM</div>
      <div className="navbar-links">
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
        >
          Dashboard
        </Link>
        <Link
          to="/contacts"
          className={location.pathname === '/contacts' ? 'active' : ''}
        >
          Contacts
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;