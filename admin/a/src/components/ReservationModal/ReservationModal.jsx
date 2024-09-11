import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import './ReservationModal.css';
const apiUrl = import.meta.env.VITE_API_URL;

const ReservationModal = ({ seatNumber, onClose, onSeatChange }) => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(seatNumber);

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/available-seats`);
        setAvailableSeats(response.data);
      } catch (error) {
        console.error('Error fetching available seats:', error);
      }
    };

    fetchAvailableSeats();
  }, []);

  const handleSeatChange = (e) => {
    setSelectedSeat(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSeatChange(selectedSeat);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Reservation</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Current Seat Number:
            <input type="text" value={seatNumber} disabled />
          </label>
          <label>
            New Seat Number:
            <select value={selectedSeat} onChange={handleSeatChange}>
              <option value="">Select a new seat</option>
              {availableSeats.map(seat => (
                <option key={seat.seatNumber} value={seat.seatNumber}>
                  {seat.seatNumber}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
