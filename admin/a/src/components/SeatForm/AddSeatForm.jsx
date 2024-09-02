import { useState, useRef } from 'react';
import axios from 'axios';
import './AddSeatForm.css';

<<<<<<< HEAD
function AddSeatForm({ onAddSeat }) {
  const [addSeat, setAddSeat] = useState({
    seatNumber: "",
    ThreeHourImage: "",
    WholeDayImage: "",
=======
function AddSeatForm({ onAddSeat, seat }) {
  const [addSeat, setAddSeat] = useState({
    seatNumber: seat ? seat.seatNumber : "",
    ThreeHourImage: seat ? seat.ThreeHourCode : "",
    WholeDayImage: seat ? seat.WholeDayCode : "",
>>>>>>> parent of 5d4153e (Revert "Merge branch 'kelly'")
    ThreeHourImageFile: null,
    WholeDayImageFile: null
  });

<<<<<<< HEAD
  const threeHourImageInputRef = useRef(null); // Reference for 3-hour image input
  const wholeDayImageInputRef = useRef(null); // Reference for 24-hour image input
=======
  const threeHourImageInputRef = useRef(null);
  const wholeDayImageInputRef = useRef(null);
>>>>>>> parent of 5d4153e (Revert "Merge branch 'kelly'")

  const imageHandler = async (file) => {
    let formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload-seat-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        return response.data.imageUrl;
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error uploading image');
    }
    return "";
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await imageHandler(file);
      if (type === 'ThreeHourImage') {
        setAddSeat(prev => ({ ...prev, ThreeHourImage: imageUrl, ThreeHourImageFile: file }));
      } else {
        setAddSeat(prev => ({ ...prev, WholeDayImage: imageUrl, WholeDayImageFile: file }));
      }
    }
  };

  const changeHandler = (e) => {
    setAddSeat({ ...addSeat, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await axios.post('http://localhost:3000/admin/add-seat', {
        seatNumber: addSeat.seatNumber,
        ThreeHourImage: addSeat.ThreeHourImage, // Include image URL
        WholeDayImage: addSeat.WholeDayImage   // Include image URL
      });
      alert('Seat added');
      if (onAddSeat) onAddSeat(response.data.seatNumber); // Pass the new seat data
      
      // Clear input fields and image previews
=======
      const response = seat
        ? await axios.put(`http://localhost:3000/admin/update-seat/${seat.seat_id}`, {
            seatNumber: addSeat.seatNumber,
            ThreeHourImage: addSeat.ThreeHourImage,
            WholeDayImage: addSeat.WholeDayImage
          })
        : await axios.post('http://localhost:3000/admin/add-seat', {
            seatNumber: addSeat.seatNumber,
            ThreeHourImage: addSeat.ThreeHourImage,
            WholeDayImage: addSeat.WholeDayImage
          });

      alert(seat ? 'Seat updated' : 'Seat added');
      if (onAddSeat) onAddSeat(response.data.seat);

>>>>>>> parent of 5d4153e (Revert "Merge branch 'kelly'")
      setAddSeat({
        seatNumber: "",
        ThreeHourImage: "",
        WholeDayImage: "",
        ThreeHourImageFile: null,
        WholeDayImageFile: null
      });
      threeHourImageInputRef.current.value = null; // Clear 3-hour image input
      wholeDayImageInputRef.current.value = null; // Clear 24-hour image input
    } catch (err) {
      console.error('Error:', err);
<<<<<<< HEAD
      alert('Error adding seat');
=======
      alert('Error adding/updating seat');
>>>>>>> parent of 5d4153e (Revert "Merge branch 'kelly'")
    }
  };

  return (
    <div className="div-con">
<<<<<<< HEAD
      <h2 className="add-reservation-title">Add Seats</h2>
=======
      <h2 className="add-reservation-title">{seat ? 'Edit Seat' : 'Add Seat'}</h2>
>>>>>>> parent of 5d4153e (Revert "Merge branch 'kelly'")
      <div className="add-reservation-form">
        <form>
          <label>
            Seat Number:
            <input type="text" name="seatNumber" onChange={changeHandler} value={addSeat.seatNumber} />
          </label>
          <label>
            Code for 3 Hours:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'ThreeHourImage')}
              ref={threeHourImageInputRef}
            />
            {addSeat.ThreeHourImage && <img src={`http://localhost:3000/Images/${addSeat.ThreeHourImage}`} className='imageCode' alt="3 Hour Code" />}
          </label>
          <label>
            Code for 24 Hours:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'WholeDayImage')}
              ref={wholeDayImageInputRef}
            />
            {addSeat.WholeDayImage && <img src={`http://localhost:3000/Images/${addSeat.WholeDayImage}`} className='imageCode' alt="24 Hour Code" />}
          </label>
          <div className="button">
<<<<<<< HEAD
            <button type="submit" className="submit-button-reservation" onClick={submitHandler}>Save</button>
=======
            <button type="submit" className="submit-button-reservation" onClick={submitHandler}>
              {seat ? 'Update' : 'Save'}
            </button>
>>>>>>> parent of 5d4153e (Revert "Merge branch 'kelly'")
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSeatForm;
