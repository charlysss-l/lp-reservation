import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="logo">Launchpad</li>
        <li className="navbar-item">
        <NavLink to={'/home'} className="pages">Home</NavLink>
        </li>
        <li className="navbar-item">
        <NavLink to={'/admin/seat-map'} className="pages">Seat Map</NavLink>
        </li>
        <li 
          className="navbar-item dropdown" 
          onMouseEnter={toggleDropdown} 
          onMouseLeave={toggleDropdown}
        >
          <span className="dropbtn">Reservation</span>
          {dropdownOpen && (
            <div className="dropdown-content">
              <NavLink to={'/admin/ongoing'}>Ongoing</NavLink>
              <NavLink to={'/admin/history'} className="pages"> History</NavLink>
            </div>
          )}
        </li>
        <li className="navbar-item">
        <NavLink to={'/admin/seat-qr'} className="pages">Seat History</NavLink>
        </li>
        <li className="navbar-item">
        <NavLink to={'/'} className="pages">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
