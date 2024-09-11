import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import axios from 'axios';
import './AddSeats.css';
import AddReservation from '../AddReservation/AddReservation'; // Import AddReservation
const apiUrl = import.meta.env.VITE_API_URL;

function AddSeats({ seat }) {
  const [status, setStatus] = useState(seat.status || 'available');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [modalSeatNumber, setModalSeatNumber] = useState(seat.seatNumber);
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
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSeatClick = () => {
    if (status === 'reserved') {
      setShowModal(true);
    } else if (status === 'available') {
      navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber } });
    }
  };

  const handleStop = async (e, data) => {
    setPosition({ x: data.x, y: data.y });
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
    <>
      <Draggable
        position={position}
        onStart={handleMouseDown}
        onStop={(e, data) => {
          handleMouseUp();
          handleStop(e, data);
        }}
        cancel=".seat"
      >
        <div className="main-container">
          <button
            className={`seat ${status}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleSeatClick}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            disabled={status === 'active'}
          >
            {seat.seatNumber}
          </button>
        </div>
      </Draggable>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddReservation
              initialSeatNumber={modalSeatNumber} // Pass the seat number to AddReservation
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AddSeats;
