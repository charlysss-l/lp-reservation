import AddSeats from "../../components/AddSeats/AddSeats";
import './SeatMap.css';
import { NavLink } from 'react-router-dom';

const SeatMap = () => {

  return (
    <div className="main-container-reservation">
      <h2 className="seatMap-title">Seat Map</h2>
      <div className="seatContainer">
          <AddSeats />
          <AddSeats />
          <AddSeats />
          <AddSeats />
      </div>
      <NavLink to={'/admin/add-reservation'} className="add-reservation-button">
        Add Reservation
      </NavLink>
    </div>
  );
}

export default SeatMap;
