
import AddSeats from "../../components/AddSeats/AddSeats";
import './Reservation.css';
import { NavLink } from 'react-router-dom';

const Reservation = () => {

  return (
    <div className="main-container-reservation">
      <h2 className="seatMap-title">Seat Map</h2>
      <div className="seatContainer">
          <AddSeats />
          <AddSeats />
          <AddSeats />
          <AddSeats />
      </div>
      <button className="add-reservation-button">
        <NavLink to={'/admin/add-reservation'}>Add Reservation</NavLink>
      </button>
    </div>
  );
}

export default Reservation;
