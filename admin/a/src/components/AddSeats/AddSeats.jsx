import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

import './AddSeats.css';

function AddSeats({ seat }) {
  const [status, setStatus] = useState(seat.status || 'available');
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(seat.status);
  }, [seat]);

  const handleSeatClick = () => {
    if (status === 'available') {
      navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
      
    } 
  };

  return (
    <div className="main-container">
      <button
        className={`seat ${status}`} // Apply class based on status
        onClick={handleSeatClick}
        disabled={status !== 'available'} // Disable button if not available
      >
        {seat.seatNumber}
      </button>
    </div>
  );
}

export default AddSeats;