import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 
const Navbar = () => {
  const [reservationDropdownOpen, setReservationDropdownOpen] = useState(false);
  const [seatDropdownOpen, setSeatDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleReservationDropdown = () => {
    setReservationDropdownOpen(!reservationDropdownOpen);
    setSeatDropdownOpen(false); 
  };

  const toggleSeatDropdown = () => {
    setSeatDropdownOpen(!seatDropdownOpen);
    setReservationDropdownOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Launchpad</div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <ul className={`navbar-list ${menuOpen ? 'active' : ''}`}>
        <li className="navbar-item">
          <NavLink to={'/home'} className="pages">Home</NavLink>
        </li>
        <li 
          className="navbar-item dropdown" 
          onClick={toggleReservationDropdown}
        >
          <span className="dropbtn">Reservation</span>
          {reservationDropdownOpen && (
            <div className="dropdown-content">
              <NavLink to={'/admin/ongoing'}>Ongoing</NavLink>
              <NavLink to={'/admin/history'}>History</NavLink>
            </div>
          )}
        </li>
        <li 
          className="navbar-item dropdown1" 
          onClick={toggleSeatDropdown}
        >
          <span className="dropbtn1">Seat</span>
          {seatDropdownOpen && (
            <div className="dropdown-content1">
              <NavLink to={'/admin/seat-map'}>Seat Map</NavLink>
              <NavLink to={'/admin/seat-qr'}>Seat Details</NavLink>
              <NavLink to={'/admin/add-seat'}>Add Seat</NavLink>
            </div>
          )}
        </li>
        <li className="navbar-item">
          <NavLink to={'/'} className="pages">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
