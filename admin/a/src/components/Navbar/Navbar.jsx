
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="side_container">
      <div className="choices">
        <h1 className="logo">Launchpad</h1>
        <NavLink to={'/'} className="pages">Home</NavLink>
        <NavLink to={'/admin/reservation'} className="pages">Reservation</NavLink>
        <NavLink to={'/admin/calendar'} className="pages">Calendar</NavLink>
      </div>
    </div>
  );
}

export default Navbar;