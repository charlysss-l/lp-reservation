import { NavLink } from 'react-router-dom';
import './AddSeats.css';

const AddSeats = ({ seatNumber, style }) => {
  return (
    <div className="main-container-seat" style={style}>
      <NavLink to="/admin/add-reservation">
        <button className="seat">
          {seatNumber}
        </button>
      </NavLink>
    </div>
  );
}

export default AddSeats;
