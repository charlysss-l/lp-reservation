import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios'; 
import './AddSeats.css';
import Modal from '../Modal/Modal';
import AddReservation from '../AddReservation/AddReservation';

const apiUrl = import.meta.env.VITE_API_URL;

function AddSeats({ seat }) {
  const [status, setStatus] = useState(seat.status || 'available');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [reservationId, setReservationId] = useState(null); // Store reservation ID for editing

  useEffect(() => {
    setStatus(seat.status);
  }, [seat]);

  useEffect(() => {
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

  const handleSeatClick = async () => {
    if (status === 'reserved') {
      // Fetch the existing reservation for this seat
      try {
        const response = await axios.get(`${apiUrl}/reservations/by-seat/${seat.seat_id}`);
        const existingReservation = response.data;
        setReservationId(existingReservation._id); // Set the reservation ID for editing
        setShowModal(true); // Open the modal
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
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

  const closeModal = () => {
    setShowModal(false);
    setReservationId(null); // Reset reservation ID when modal is closed
  };

  return (
    <>
      <Draggable
        position={position}
        onStop={handleStop}
        cancel=".seat"
      >
        <div className="main-container">
          <button
            className={`seat ${status}`}
            onClick={handleSeatClick}
            disabled={status === 'active'}
          >
            {seat.seatNumber}
          </button>
        </div>
      </Draggable>

      <Modal isOpen={showModal} onClose={closeModal}>
        <AddReservation seatNumber={seat.seatNumber} reservationId={reservationId} onClose={closeModal} />
      </Modal>
    </>
  );
}

export default AddSeats;
