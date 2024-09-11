import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddReservation.css';

const apiUrl = import.meta.env.VITE_API_URL;

const AddReservation = ({ seatNumber, reservation }) => {
  const navigate = useNavigate();

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
    name: reservation?.name || "",
    email: reservation?.email || "",
    contactNumber: reservation?.contactNumber || "",
    company: reservation?.company || "",
    seatNumber: seatNumber || "",
    internetHours: reservation?.internetHours || "",
    startDate: reservation?.startDate || getDefaultDate(),
    startTime: reservation?.startTime || getDefaultTime(),
  });

  const [seats, setSeats] = useState([]);
  const [codeImage, setCodeImage] = useState("");

  useEffect(() => {
    axios.get(`${apiUrl}/admin/seat-qr`)
      .then(res => {
        setSeats(res.data);
      })
      .catch(err => console.error('Error fetching seats:', err));
  }, []);

  useEffect(() => {
    const selectedSeat = seats.find(seat => seat.seatNumber === addUsers.seatNumber);
    if (selectedSeat) {
      let code = "";
      switch (addUsers.internetHours) {
        case '3':
          code = selectedSeat.ThreeHourCode;
          break;
        case '7':
          code = selectedSeat.WholeDayCode;
          break;
        case '168':
          code = selectedSeat.WeeklyCode;
          break;
        case '720':
          code = selectedSeat.MonthlyCode;
          break;
        default:
          code = "";
      }
      setCodeImage(code || "");
    }
  }, [addUsers.seatNumber, addUsers.internetHours, seats]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddUsers(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const convertTo24HourFormat = (time) => {
    let [timePart, ampm] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
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

    const selectedSeat = seats.find(seat => seat.seatNumber === addUsers.seatNumber);

    if (selectedSeat && selectedSeat.status === 'active') {
      console.log('This seat is already reserved.');
      alert('This seat is already reserved. Please choose a different seat.');
      return; // Prevent submission if the seat is reserved
    }

    let code = "";
    switch (addUsers.internetHours) {
      case '3':
        code = selectedSeat?.ThreeHourCode;
        break;
      case '7':
        code = selectedSeat?.WholeDayCode;
        break;
      case '168':
        code = selectedSeat?.WeeklyCode;
        break;
      case '720':
        code = selectedSeat?.MonthlyCode;
        break;
      default:
        code = "";
    }

    const startTime = new Date(`${addUsers.startDate} ${convertTo24HourFormat(addUsers.startTime)}`).toISOString();

    // Determine status based on internetHours
    const status = ['168', '720'].includes(addUsers.internetHours) ? 'reserved' : 'active';
    
    try {
      if (reservation) {
        // Update existing reservation
        await axios.put(`${apiUrl}/admin/update-reservation`, {
          ...addUsers,
          code: code,
          startTime: startTime,
          status: status
        });
      } else {
        // Create new reservation
        await axios.post(`${apiUrl}/admin/create-reservation`, {
          ...addUsers,
          code: code,
          startTime: startTime,
          status: status
        });
      }
      navigate('/admin/reservation-history');
    } catch (err) {
      console.error('Error saving reservation:', err);
    }
  };

  return (
    <form className="reservation-form" onSubmit={submitHandler}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={addUsers.name}
          onChange={changeHandler}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={addUsers.email}
          onChange={changeHandler}
          required
        />
      </label>
      <label>
        Contact Number:
        <input
          type="text"
          name="contactNumber"
          value={addUsers.contactNumber}
          onChange={changeHandler}
          required
        />
      </label>
      <label>
        Company:
        <input
          type="text"
          name="company"
          value={addUsers.company}
          onChange={changeHandler}
        />
      </label>
      <label>
        Seat Number:
        <input
          type="text"
          name="seatNumber"
          value={addUsers.seatNumber}
          onChange={changeHandler}
          required
        />
      </label>
      <label>
        Internet Hours:
        <select
          name="internetHours"
          value={addUsers.internetHours}
          onChange={changeHandler}
          required
        >
          <option value="">Select Hours</option>
          <option value="3">3 Hours</option>
          <option value="7">1 Day</option>
          <option value="168">1 Week</option>
          <option value="720">1 Month</option>
        </select>
      </label>
      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={addUsers.startDate}
          onChange={changeHandler}
          required
        />
      </label>
      <label>
        Start Time:
        <input
          type="text"
          name="startTime"
          value={addUsers.startTime}
          onChange={changeHandler}
          required
        />
      </label>
      <div className="code-preview">
        {codeImage && <img src={codeImage} alt="Reservation Code" />}
      </div>
      <button type="submit">Save Reservation</button>
    </form>
  );
};

export default AddReservation;
