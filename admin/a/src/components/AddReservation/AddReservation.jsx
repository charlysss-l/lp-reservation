import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate
import './AddReservation.css';

const AddReservation = () => {
  const [addUsers, setAddUsers] = useState({
    name: "",
    email: "",
    contactNumber: "",
    company: "",
    seatNumber: "",
    internetHours: "",
  });

  const [seats, setSeats] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get('http://localhost:3000/admin/seat-qr')
      .then(res => {
        setSeats(res.data); // Assuming the data is an array of seat objects
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

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Find the selected seat and determine the correct code
    const selectedSeat = seats.find(seat => seat.seatNumber === addUsers.seatNumber);
    const code = addUsers.internetHours === '3' ? selectedSeat?.ThreeHourCode : selectedSeat?.WholeDayCode;

    try {
      await axios.post('http://localhost:3000/admin/add-reservation', {
        ...addUsers,
        code: code, // Send the code along with the reservation data
      });

      // Redirect to the new page with the code
      navigate('/admin/reservation-success', { state: { code: code } });

      // Reset form fields
      setAddUsers({
        name: "",
        email: "",
        contactNumber: "",
        company: "",
        seatNumber: "",
        internetHours: "",
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
