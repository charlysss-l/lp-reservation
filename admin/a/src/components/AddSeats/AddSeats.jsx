import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import axios from 'axios'; // Import axios for HTTP requests
import './AddSeats.css';

function AddSeats({ seat }) {
  const [status, setStatus] = useState(seat.status || 'available');
  const [isDragging, setIsDragging] = useState(false); // State to track dragging
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State to track position
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(seat.status);
  }, [seat]);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/seat-position/${seat.seat_id}`);
        const seatPosition = response.data.position;
        if (seatPosition) {
          setPosition(seatPosition);
        }
      } catch (error) {
        console.error('Error fetching seat position:', error);
      }
    };

    fetchPosition();
  }, [seat.seat_id]);

  const handleMouseDown = () => {
    setIsDragging(true); // Set dragging state to true on mouse down
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Set dragging state to false on mouse up
  };

  const handleSeatClick = (e) => {
    if (status === 'available' && !isDragging) { // Check if not dragging
      navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
    }
  };

  const handleStop = async (e, data) => {
    // Update the position in state
    setPosition({ x: data.x, y: data.y });

    // Save the new position to MongoDB
    try {
      await axios.put(`http://localhost:3000/admin/update-seat-position/${seat.seat_id}`, {
        x: data.x,
        y: data.y
      });
    } catch (error) {
      console.error('Error updating seat position:', error);
    }
  };

  return (
    <Draggable
      position={position} // Set the initial position
      onStart={handleMouseDown}  // Set dragging state to true on start
      onStop={(e, data) => {
        handleMouseUp();
        handleStop(e, data); // Save position when dragging stops
      }}
    >
      <div className="main-container">
        <button
          className={`seat ${status}`} // Apply class based on status
          onMouseDown={handleMouseDown} // Start tracking dragging
          onMouseUp={handleMouseUp}     // Stop tracking dragging
          onClick={handleSeatClick}
          disabled={status !== 'available'} // Disable button if not available
        >
          {seat.seatNumber}
        </button>
      </div>
    </Draggable>
  );
}

export default AddSeats;