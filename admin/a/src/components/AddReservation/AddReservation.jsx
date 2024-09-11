import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddReservation.css';
const apiUrl = import.meta.env.VITE_API_URL;

const AddReservation = ({ initialSeatNumber, onClose }) => {
  const navigate = useNavigate();

  const getDefaultDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
  };

  const getDefaultTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes.toString().padStart(2, '0');
    return `${hours.toString().padStart(2, '0')}:${strMinutes} ${ampm}`;
  };

  const [addUsers, setAddUsers] = useState({
    name: "",
    email: "",
    contactNumber: "",
    company: "",
    seatNumber: initialSeatNumber,
    internetHours: "",
    startDate: getDefaultDate(),
    startTime: getDefaultTime(),
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
        case '24':
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

    if (selectedSeat && selectedSeat.status === 'active' || selectedSeat.status === 'reserved') {
      console.log('This seat is already reserved.');
      alert('This seat is already reserved. Please choose a different seat.');
      return;
    }

    let code = "";
    switch (addUsers.internetHours) {
      case '3':
        code = selectedSeat?.ThreeHourCode;
        break;
      case '24':
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

    const status = ['168', '720'].includes(addUsers.internetHours) ? 'reserved' : 'active';

    try {
      await axios.post(`${apiUrl}/admin/add-reservation`, {
        ...addUsers,
        code: code,
        startTime: startTime,
      });

      await axios.put(`${apiUrl}/admin/update-seat-status`, {
        seatNumber: addUsers.seatNumber,
        status: status
      });

      navigate('/admin/reservation-success', { state: { code } });

      setAddUsers({
        name: "",
        email: "",
        contactNumber: "",
        company: "",
        seatNumber: initialSeatNumber,
        internetHours: "",
        startDate: getDefaultDate(),
        startTime: getDefaultTime(),
      });
      onClose(); // Close the modal
    } catch (err) {
      console.error('Error adding reservation:', err);
      alert('Error adding reservation. Please try again.');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Reservation Form</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={addUsers.name} onChange={changeHandler} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={addUsers.email} onChange={changeHandler} required />
      </div>
      <div>
        <label>Contact Number:</label>
        <input type="tel" name="contactNumber" value={addUsers.contactNumber} onChange={changeHandler} required />
      </div>
      <div>
        <label>Company:</label>
        <input type="text" name="company" value={addUsers.company} onChange={changeHandler} />
      </div>
      <div>
        <label>Seat Number:</label>
        <input type="text" name="seatNumber" value={addUsers.seatNumber} readOnly />
      </div>
      <div>
        <label>Internet Hours:</label>
        <select name="internetHours" value={addUsers.internetHours} onChange={changeHandler} required>
          <option value="">Select Hours</option>
          <option value="3">3 Hours</option>
          <option value="24">24 Hours</option>
          <option value="168">Weekly</option>
          <option value="720">Monthly</option>
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" name="startDate" value={addUsers.startDate} onChange={changeHandler} required />
      </div>
      <div>
        <label>Start Time:</label>
        <input type="time" name="startTime" value={addUsers.startTime} onChange={changeHandler} required />
      </div>
      <div>
        {codeImage && <img src={codeImage} alt="Reservation Code" />}
      </div>
      <button type="submit">Save Reservation</button>
      <button type="button" onClick={onClose}>Close</button>
    </form>
  );
};

export default AddReservation;
