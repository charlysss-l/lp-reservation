import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
  const [reservationDropdownOpen, setReservationDropdownOpen] = useState(false);
  const [seatDropdownOpen, setSeatDropdownOpen] = useState(false);

  const toggleReservationDropdown = () => {
    setReservationDropdownOpen(!reservationDropdownOpen);
    setSeatDropdownOpen(false); // Close the Seat dropdown when Reservation is clicked
  };

  const toggleSeatDropdown = () => {
    setSeatDropdownOpen(!seatDropdownOpen);
    setReservationDropdownOpen(false); // Close the Reservation dropdown when Seat is clicked
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="logo">Launchpad</li>
        <li className="navbar-item">
          <NavLink to={'/home'} className="pages">Home</NavLink>
        </li>
        <li 
          className="navbar-item dropdown" 
          onMouseEnter={toggleReservationDropdown} 
          onMouseLeave={toggleReservationDropdown}
        >
          <span className="dropbtn">Reservation</span>
          {reservationDropdownOpen && (
            <div className="dropdown-content">
              <NavLink to={'/admin/add-reservation'}>Add Reservation</NavLink>
              <NavLink to={'/admin/ongoing'}>Ongoing</NavLink>
              <NavLink to={'/admin/history'}> History</NavLink>

            </div>
          )}
        </li>
        
        <li 
          className="navbar-item dropdown1" 
          onMouseEnter={toggleSeatDropdown} 
          onMouseLeave={toggleSeatDropdown}
        >
          <span className="dropbtn1">Seat</span>
          {seatDropdownOpen && (
            <div className="dropdown-content1">
               <NavLink to={'/admin/add-seat'}> Add Seat</NavLink>
              <NavLink to={'/admin/seat-map'}>Seat Map</NavLink>
              <NavLink to={'/admin/seat-qr'}>Seat Details</NavLink>
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
