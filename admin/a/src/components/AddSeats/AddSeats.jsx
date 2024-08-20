<<<<<<< HEAD
import { useState } from 'react';
import './AddSeats.css';

const AddSeats = ({ seat }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="main-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="seat">
        {seat.seatNumber}
      </button>
      {isHovered && (
        <div className="seat-info">
          <p>Seat ID:{seat.seat_id}</p>
          <p>Three Hour Code: {seat.ThreeHourCode}</p>
          <p>Whole Day Code:{seat.WholeDayCode}</p>
        </div>
      )}
=======
import './AddSeats.css';

const AddSeats = ({ seatNumber }) => {
  return (
    <div className="main-container">
      <button className="seat">
        {seatNumber}
      </button>
>>>>>>> parent of efedc22 (SeatMap)
    </div>
  );
};

export default AddSeats;
