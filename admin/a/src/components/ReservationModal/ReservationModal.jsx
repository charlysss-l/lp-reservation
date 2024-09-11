import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import './ReservationModal.css';
const apiUrl = import.meta.env.VITE_API_URL;

const ReservationModal = ({ seatNumber, onClose, onSeatChange }) => {
  const [newSeatNumber, setNewSeatNumber] = useState(seatNumber);

  const handleSeatChange = (e) => {
    setNewSeatNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the new seat number
    try {
      const response = await axios.get(`${apiUrl}/admin/validate-seat/${newSeatNumber}`);
      if (!response.data.isValid) {
        alert('Seat number is not valid or is already reserved.');
        return;
      }
      // Call the onSeatChange function to update the seat
      onSeatChange(newSeatNumber);
      onClose();
    } catch (error) {
      console.error('Error validating seat number:', error);
      alert('Failed to validate the seat number.');
    }
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
            <input
              type="text"
              value={newSeatNumber}
              onChange={handleSeatChange}
              placeholder="Enter new seat number"
              required
            />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
