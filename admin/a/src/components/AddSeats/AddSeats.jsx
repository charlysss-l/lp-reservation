import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSeats.css';

const AddSeats = ({ seat }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSeatClick = () => {
    navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
  };

  return (
    <div
      className="main-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="seat" onClick={handleSeatClick}>
        {seat.seatNumber}
      </button>
      {isHovered && (
        <div className="seat-info">
          <p>Seat ID: {seat.seat_id}</p>
          <p>Three Hour Code: {seat.ThreeHourCode}</p>
          <p>Whole Day Code: {seat.WholeDayCode}</p>
        </div>
      )}
    </div>
  );
};

export default AddSeats;
