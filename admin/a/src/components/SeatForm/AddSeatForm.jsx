import { useState, useRef } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AddSeatForm.css';
const apiUrl = import.meta.env.VITE_API_URL;

const storage = getStorage(); // Initialize Firebase Storage

function AddSeatForm({ onAddSeat, seat }) {
  const [addSeat, setAddSeat] = useState({
    seatNumber: seat ? seat.seatNumber : "",
    ThreeHourImage: seat ? seat.ThreeHourCode : "",
    WholeDayImage: seat ? seat.WholeDayCode : "",
    WeeklyImage: seat ? seat.WeeklyCode : "",
    MonthlyImage: seat ? seat.MonthlyCode : "",
    ThreeHourImageFile: null,
    WholeDayImageFile: null,
    WeeklyImageFile: null,
    MonthlyImageFile: null
  });

  const threeHourImageInputRef = useRef(null);
  const wholeDayImageInputRef = useRef(null);
  const weeklyImageInputRef = useRef(null);
  const monthlyImageInputRef = useRef(null);

  const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
    return "";
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImageToFirebase(file);
      setAddSeat(prev => ({ ...prev, [`${type}Image`]: imageUrl, [`${type}ImageFile`]: file }));
    }
  };

  const changeHandler = (e) => {
    setAddSeat({ ...addSeat, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setAddSeat({ ...addSeat, seatNumber: value });
      
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Determine seatType
    const seatType = isNaN(addSeat.seatNumber) ? 'lettered' : 'numbered';

    try {
      const response = seat
        ? await axios.put(`${apiUrl}/admin/update-seat/${seat.seat_id}`, {
            seatNumber: addSeat.seatNumber,
            seatType: seatType, // Set seat type

            ThreeHourImage: addSeat.ThreeHourImage,
            WholeDayImage: addSeat.WholeDayImage,
            WeeklyImage: addSeat.WeeklyImage,
            MonthlyImage: addSeat.MonthlyImage
          })
        : await axios.post(`${apiUrl}/admin/add-seat`, {
            seatNumber: addSeat.seatNumber,
            seatType: seatType, // Set seat type

            ThreeHourImage: addSeat.ThreeHourImage,
            WholeDayImage: addSeat.WholeDayImage,
            WeeklyImage: addSeat.WeeklyImage,
            MonthlyImage: addSeat.MonthlyImage
          });

      alert(seat ? 'Seat updated' : 'Seat added');
      if (onAddSeat) onAddSeat(response.data.seat);

      setAddSeat({
        seatNumber: "",
        ThreeHourImage: "",
        WholeDayImage: "",
        WeeklyImage: "",
        MonthlyImage: "",
        ThreeHourImageFile: null,
        WholeDayImageFile: null,
        WeeklyImageFile: null,
        MonthlyImageFile: null
      });
      threeHourImageInputRef.current.value = null;
      wholeDayImageInputRef.current.value = null;
      weeklyImageInputRef.current.value = null;
      monthlyImageInputRef.current.value = null;
    } catch (err) {
      
    }
  };

  return (
    <div className="div-con">
      <h2 className="add-reservation-title">{seat ? 'Edit Seat' : 'Add Seat'}</h2>
      <div className="add-reservation-form">
        <form>
          <label>
            Seat Number:<span className='asterisk'>*</span> Only numbers are allowed!

            <input type="text" name="seatNumber" onChange={handleNumberChange} value={addSeat.seatNumber} pattern="\d*" 
              title="Please enter a valid number" />
          </label>
          <label>
            Code for 3 Hours:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'ThreeHour')}
              ref={threeHourImageInputRef}
            />
            {addSeat.ThreeHourImage && <img src={addSeat.ThreeHourImage} className='imageCode' alt="3 Hour Code" />}
          </label>
          <label>
            Code for Whole Day:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'WholeDay')}
              ref={wholeDayImageInputRef}
            />
            {addSeat.WholeDayImage && <img src={addSeat.WholeDayImage} className='imageCode' alt="24 Hour Code" />}
          </label>
          {/* <label>
            Code for Weekly:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'Weekly')}
              ref={weeklyImageInputRef}
            />
            {addSeat.WeeklyImage && <img src={addSeat.WeeklyImage} className='imageCode' alt="1 Week Code" />}
          </label>
          <label>
            Code for Monthly:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'Monthly')}
              ref={monthlyImageInputRef}
            />
            {addSeat.MonthlyImage && <img src={addSeat.MonthlyImage} className='imageCode' alt="1 Month Code" />}
          </label> */}
          <div className="button">
            <button type="submit" className="submit-button-reservation" onClick={submitHandler}>
              {seat ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSeatForm;
