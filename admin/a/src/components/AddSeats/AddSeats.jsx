import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import axios from 'axios'; // Import axios for HTTP requests
import './AddSeats.css';
const apiUrl = import.meta.env.VITE_API_URL;

function AddSeats({ seat }) {
  const [status, setStatus] = useState(seat.status || 'available');
  const [isDragging, setIsDragging] = useState(false); // State to track dragging
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State to track position
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [newSeatNumber, setNewSeatNumber] = useState(seat.seatNumber); // State for new seat number
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

  const handleSeatClick = () => {
    if (status === 'available' || status === 'reserved') { // Allow click for both available and reserved
      navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
    }
  };

  const handleEditClick = () => {
    if (status === 'reserved') {
      // Save changes to seat
      const updateSeats = async () => {
        try {
          // Update the new seat to 'reserved' status
          await axios.put(`${apiUrl}/admin/update-seat-status`, {
            seatNumber: newSeatNumber,
            status: 'reserved'
          });

          // Update the previous seat to 'available' status
          await axios.put(`${apiUrl}/admin/update-seat-status`, {
            seatNumber: seat.seatNumber,
            status: 'available'
          });

          // Navigate to a new page or show a success message
          navigate('/admin/seat-updated-success');
        } catch (error) {
          console.error('Error updating seat:', error);
        }
      };

      updateSeats();
      setIsEditing(false); // Exit editing mode
    } else {
      setIsEditing(true); // Enter editing mode
    }
  };

  const handleNewSeatNumberChange = (e) => {
    setNewSeatNumber(e.target.value); // Update new seat number
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
          onClick={status === 'reserved' ? handleEditClick : handleSeatClick} // Click handling based on status
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          disabled={status === 'active'} // Disable only for 'active' status
        >
          {status === 'reserved' && isEditing ? (
            <input 
              type="text" 
              value={newSeatNumber} 
              onChange={handleNewSeatNumberChange} 
              onBlur={() => setIsEditing(false)} // Exit editing mode on blur
            />
          ) : (
            seat.seatNumber
          )}
        </button>
      </div>
    </Draggable>
  );
}

export default AddSeats;
