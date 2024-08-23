import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const AddEndReservation = () => {
  const location = useLocation();
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
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const strHours = hours.toString().padStart(2, '0');
    const strMinutes = minutes.toString().padStart(2, '0');
    return `${strHours}:${strMinutes}`;
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

    // Ensure the date and time are valid
    const finalEndDateTimeString = `${addEnd.finalEndDate}T${addEnd.finalEndTime}`;
    const finalEndDateTime = new Date(finalEndDateTimeString);

    console.log('Final End Date:', addEnd.finalEndDate);
    console.log('Final End Time:', addEnd.finalEndTime);
    console.log('Final End DateTime String:', finalEndDateTimeString);
    console.log('Final End DateTime:', finalEndDateTime);

    if (isNaN(finalEndDateTime.getTime())) {
        alert('Invalid date or time format');
        return;
    }

    try {
        await axios.post('http://localhost:3000/admin/end-reservation', {
            user_id: user.user_id,
            finalEndDate: addEnd.finalEndDate,
            finalEndTime: addEnd.finalEndTime,
        });

    } catch (err) {
        console.log('Error adding end date:', err);
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
