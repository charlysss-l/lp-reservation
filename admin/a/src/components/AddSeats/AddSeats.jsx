import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import axios from 'axios'; // Import axios for HTTP requests
import './AddSeats.css';
const apiUrl = import.meta.env.VITE_API_URL;

function AddSeats({ seat, currentReservedSeat, setCurrentReservedSeat }) {
  const [status, setStatus] = useState(seat.status || 'available');
  const [isDragging, setIsDragging] = useState(false); // State to track dragging
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State to track position
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(seat.status);
  }, [seat]);

  useEffect(() => {
    console.log("Fetching position for seat_id:", seat.seat_id);
    const fetchPosition = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/seat-position/${seat.seat_id}`);
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

  const handleSeatClick = async () => {
    if (status === 'available' || status === 'reserved') { // Allow click for both available and reserved
      if (status === 'reserved') {
        // If the seat is already reserved, navigate to the edit page with the current seat number
        navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
      } else {
        // Update the status of the previously reserved seat to available
        if (currentReservedSeat) {
          try {
            await axios.put(`${apiUrl}/admin/update-seat-status`, {
              seatNumber: currentReservedSeat.seatNumber,
              status: 'available'
            });
          } catch (error) {
            console.error('Error updating previous seat status:', error);
          }
        }
        
        // Update the status of the newly reserved seat to reserved
        try {
          await axios.put(`${apiUrl}/admin/update-seat-status`, {
            seatNumber: seat.seatNumber,
            status: 'reserved'
          });
          setCurrentReservedSeat(seat);
          navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
        } catch (error) {
          console.error('Error updating seat status:', error);
        }
      }
    }
  };

  const handleStop = async (e, data) => {
    // Update the position in state
    setPosition({ x: data.x, y: data.y });

    // Save the new position to MongoDB
    try {
      await axios.put(`${apiUrl}/admin/update-seat-position/${seat.seat_id}`, {
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
      cancel=".seat" // Prevents dragging if the target is the .seat element
    >
      <div className="main-container">
        <button
          className={`seat ${status}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleSeatClick}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          {seat.seatNumber}
        </button>
      </div>
    </Draggable>
  );
}

export default AddSeats;
