import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import './AddSeats.css';

function AddSeats({ seat, onSeatChange }) {
  const [status, setStatus] = useState(seat.status || 'available');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(seat.status);
  }, [seat]);

  useEffect(() => {
    // Load position from localStorage
    const savedPosition = localStorage.getItem(`seat-position-${seat.seat_id}`);
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, [seat.seat_id]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSeatClick = () => {
    if (seat.seatType === 'numbered') {
      navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
    } else if (seat.seatType === 'lettered') {
      navigate('/admin/add-reservation-reserve', { state: { seatNumber: seat.seatNumber } });
    }
  };

  const handleStop = (e, data) => {
    // Update the position in state
    setPosition({ x: data.x, y: data.y });

    // Save the new position to localStorage
    localStorage.setItem(`seat-position-${seat.seat_id}`, JSON.stringify({ x: data.x, y: data.y }));
  };

  const handleChangeSeat = async (newSeatNumber) => {
    try {
      // You can update the seat status if needed, but since we are not saving to a server, this can be omitted
      // Call the parent callback to handle state update
      if (onSeatChange) {
        onSeatChange(newSeatNumber);
      }
    } catch (error) {
      console.error('Error changing seat:', error);
    }
  };

  return (
    <Draggable
      position={position}
      onStart={handleMouseDown}
      onStop={(e, data) => {
        handleMouseUp();
        handleStop(e, data);
      }}
      cancel={status === 'available' && '.seat'}
    >
      <div className="main-container">
        <button
          className={`seat ${status} ${seat.seatType}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleSeatClick}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          disabled={status === 'active' || status === 'reserved'}
        >
          {seat.seatNumber}
        </button>
      </div>
    </Draggable>
  );
}

export default AddSeats;
