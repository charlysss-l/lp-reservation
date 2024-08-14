
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="side_container">
      <div className="choices">
        <h1 className="logo">Launchpad</h1>
        <NavLink to={'/home'} className="pages">Home</NavLink>
        <NavLink to={'/admin/seat-map'} className="pages">Seat Map</NavLink>
        <NavLink to={'/admin/history'} className="pages">History</NavLink>
      </div>
    </div>
  );
}

export default Navbar;