import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

import './AddSeats.css';

function AddSeats  ({ seat })  {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  

  




  const handleSeatClick = () => {
    navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
  };

  

  return (
    <div
      className="main-container"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <button className="seat" onClick={handleSeatClick}>
        {seat.seatNumber}
      </button>
      {/* {isHovered && (
        <div className="seat-info">
          <p>Three Hour Code: 
          </p>
          {image && <img src={getImageUrl()} alt="Seat Map" />}
          <p>Whole Day Code:</p>
          {image && <img src={getImageUrl()} alt="Seat Map" />}
        </div>
      )} */}
    </div>
  );
};

export default AddSeats;
