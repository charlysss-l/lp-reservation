import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddReservation.css';

const AddReservation = () => {
  // Function to get today's date in MM-DD-YYYY format
  const getDefaultDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();
    const year = today.getFullYear();
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
  };

  // Function to get current time in 12-hour format with AM/PM
  const getDefaultTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes.toString().padStart(2, '0');
    return `${hours.toString().padStart(2, '0')}:${strMinutes} ${ampm}`;
  };

  const [addUsers, setAddUsers] = useState({
    name: "",
    email: "",
    contactNumber: "",
    company: "",
    seatNumber: "",
    internetHours: "",
    startDate: getDefaultDate(),
    startTime: getDefaultTime(),
  });

  const [seats, setSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/admin/seat-qr')
      .then(res => {
        setSeats(res.data);
      })
      .catch(err => console.error('Error fetching seats:', err));
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddUsers(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const convertTo24HourFormat = (time) => {
    let [hours, minutes] = time.split(':');
    const ampm = minutes.slice(-2);
    minutes = minutes.slice(0, -3); // Remove AM/PM from minutes

    hours = parseInt(hours, 10);
    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Find the selected seat and determine the correct code
    const selectedSeat = seats.find(seat => seat.seatNumber === addUsers.seatNumber);
    const code = addUsers.internetHours === '3' ? selectedSeat?.ThreeHourCode : selectedSeat?.WholeDayCode;

    const startTime = new Date(`${addUsers.startDate} ${convertTo24HourFormat(addUsers.startTime)}`).toISOString();

    // Calculate end time here (if needed)
    // const endTime = calculateEndTime(startTime, addUsers.internetHours);

    try {
        await axios.post('http://localhost:3000/admin/add-reservation', {
            ...addUsers,
            code: code,
            startTime: startTime,
            // endTime: endTime
        });

        navigate('/admin/reservation-success', { state: { code: code } });

        setAddUsers({
            name: "",
            email: "",
            contactNumber: "",
            company: "",
            seatNumber: seatNumberFromURL, // Pre-fill the seat number here
            internetHours: "",
            startDate: getDefaultDate(),
            startTime: getDefaultTime(),
        });
    } catch (err) {
        console.log(err);
        alert('Error adding reservation');
    }
};
  return (
    <div className="div-con">
      <h2 className="add-reservation-title">Add Reservation</h2>
      <div className="add-reservation-form">
        <form>
          <label>
            Date:
            <input
              type="text"
              name="startDate"
              value={addUsers.startDate}
              readOnly // Set to readOnly since it's a default value
            />
          </label>
          <label>
            Start Time:
            <input
              type="text"
              name="startTime"
              onChange={changeHandler}
              value={addUsers.startTime}
              placeholder="HH:MM AM/PM"
            />
          </label>
          <label>
            Name:
            <input type="text" name="name" onChange={changeHandler} value={addUsers.name} />
          </label>
          <label>
            Email:
            <input type="text" name="email" onChange={changeHandler} value={addUsers.email} />
          </label>
          <label>
            Contact Number:
            <input type="text" name="contactNumber" onChange={changeHandler} value={addUsers.contactNumber} />
          </label>
          <label>
            Company:
            <input type="text" name="company" onChange={changeHandler} value={addUsers.company} />
          </label>
          <label>
            Seat Number:
            <select name="seatNumber" onChange={changeHandler} value={addUsers.seatNumber}>
              <option value="">Select Seat Number</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              

              {seats.map((seat, index) => (
                <option key={index} value={seat.seatNumber}>
                  {seat.seatNumber}
                </option>
              ))}
            </select>
          </label>
          <label>
            Internet Hours:
            <select name="internetHours" onChange={changeHandler} value={addUsers.internetHours}>
              <option value="">Select Internet Hours</option>
              <option value="3">3 Hours</option>
              <option value="24">24 Hours</option>
            </select>
          </label>
          <div className="button">
            <button type="submit" className="submit-button-reservation" onClick={submitHandler}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReservation;
