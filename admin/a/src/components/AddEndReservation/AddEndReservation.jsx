import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const AddEndReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Hook to handle navigation
  const user = location.state?.user; // Access passed user data

  const getDefaultDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDefaultTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [addEnd, setAddEnd] = useState({
    finalEndDate: getDefaultDate(),
    finalEndTime: getDefaultTime(),
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!user || !user.user_id) {
      alert('User information is missing');
      return;
    }

    // Confirmation before proceeding
    const isConfirmed = window.confirm('Are you sure you want to end this reservation?');

    if (!isConfirmed) return; // Exit if the user does not confirm

    // Ensure the date and time are valid
    const finalEndDateTime = new Date(`${addEnd.finalEndDate}T${addEnd.finalEndTime}`);
    const adjustedFinalEndDateTime = new Date(finalEndDateTime.getTime() - (finalEndDateTime.getTimezoneOffset() * 60000));

    if (isNaN(finalEndDateTime.getTime())) {
      alert('Invalid date or time format');
      return;
    }

    try {
      await axios.post(`${apiUrl}/admin/end-reservation`, {
        user_id: user.user_id,
        finalEndDate: adjustedFinalEndDateTime.toISOString().split('T')[0],  // Send date
    finalEndTime: adjustedFinalEndDateTime.toISOString().split('T')[1],  // Send time
  });

      // Update the seat status to 'available'
      await axios.put(`${apiUrl}/admin/update-seat-status`, {
        seatNumber: user.seatNumber, // Assuming user object contains seatNumber
        status: 'available'
    });

      alert('Reservation ended successfully!');
      navigate('/admin/ongoing'); // Redirect after successful save

    } catch (err) {
      console.error('Error adding end date:', err);
      alert('Error adding end date');
    }
  };

  return (
    <div className="div-con">
      <h2 className="add-reservation-title">End Reservation</h2>
      <div className="add-reservation-form">
        <form onSubmit={submitHandler}>
          <div className="dateTime">
            <label>
              End Date: 
              <input 
                type="date" 
                value={addEnd.finalEndDate} 
                onChange={(e) => setAddEnd({...addEnd, finalEndDate: e.target.value})} 
              />
            </label>
            <label>
              End Time: 
              <input 
                type="time" 
                value={addEnd.finalEndTime} 
                onChange={(e) => setAddEnd({...addEnd, finalEndTime: e.target.value})} 
              />
            </label>
          </div>
          <div className="button">
            <button type="submit" className="submit-button-reservation">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEndReservation;
