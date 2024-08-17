import { NavLink } from 'react-router-dom';
import './Home.css';



const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to  Reservation System</h1>
      
      <div className="button-container">
        <NavLink to={'/admin/add-reservation'} className="link-to-reserve-form">
          Reserve a Seat
        </NavLink>
        <NavLink to={'/admin/seat-map'} className="home-availability">
          Check Availability
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
