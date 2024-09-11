import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import axios from 'axios';
import './AddSeats.css';
import AddReservation from '../AddReservation/AddReservation';
import Modal from '../Modal/Modal';

const apiUrl = import.meta.env.VITE_API_URL;

function AddSeats({ seat }) {
  const [status, setStatus] = useState(seat.status || 'available');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [reservationDetails, setReservationDetails] = useState(null); // State to hold reservation details
  const navigate = useNavigate();

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
    if (status === 'available') {
      // Navigate to AddReservation with empty reservation data
      navigate('/admin/add-reservation', { state: { seatNumber: seat.seatNumber, reservation: null } });
    } else if (status === 'reserved') {
      // Fetch reservation details for the reserved seat
      try {
        const response = await axios.get(`${apiUrl}/admin/reservation/${seat.seatNumber}`);
        setReservationDetails(response.data);
        setShowModal(true); // Open the modal with reservation details
      } catch (error) {
        console.error('Error fetching reservation details:', error);
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
    setShowModal(false); // Close the modal
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
            disabled={status === 'active'} // Disable only for 'active' seats
          >
            {seat.seatNumber}
          </button>
        </div>
      </Draggable>

      {/* Show the modal when showModal is true */}
      {showModal && (
        <Modal isOpen={showModal} onClose={closeModal}>
          {/* Pass the seat number and reservation details to AddReservation */}
          <AddReservation seatNumber={seat.seatNumber} reservation={reservationDetails} />
        </Modal>
      )}
    </>
  );
}

export default AddSeats;
