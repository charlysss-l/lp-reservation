import { useState } from 'react';
import axios from 'axios';
import './AddSeatForm.css';

function AddSeatForm ({ onAddSeat })  {
  const [addSeat, setAddSeat] = useState({
    seatNumber: "",
    ThreeHourImage: "",
    WholeDayImage: "",
    ThreeHourImageFile: null,
    WholeDayImageFile: null
});

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
        const response = await axios.post('http://localhost:3000/admin/add-seat', {
            seatNumber: addSeat.seatNumber,
            ThreeHourImage: addSeat.ThreeHourImage, // Include image URL
            WholeDayImage: addSeat.WholeDayImage   // Include image URL
        });
        alert('Seat added');
        if (onAddSeat) onAddSeat(response.data.seatNumber); // Pass the new seat data
        setAddSeat({
            seatNumber: "",
            ThreeHourImage: "",
            WholeDayImage: ""
        });
    } catch (err) {
        console.error('Error:', err);
        alert('Error adding seat');
    }
};



  

  

return (
  <div className="div-con">
      <h2 className="add-reservation-title">Add Seats</h2>
      <div className="add-reservation-form">
          <form>
              <label>
                  Seat Number:
                  <input type="text" name="seatNumber" onChange={changeHandler} value={addSeat.seatNumber} />
              </label>
              <label>
                  Code for 3 Hours:
                  <input type="file" onChange={(e) => handleImageChange(e, 'ThreeHourImage')} />
                  {addSeat.ThreeHourImage && <img src={`http://localhost:3000/Images/${addSeat.ThreeHourImage}`} className='imageCode' alt="3 Hour Code" />}
              </label>
              <label>
                  Code for 24 Hours:
                  <input type="file" onChange={(e) => handleImageChange(e, 'WholeDayImage')} />
                  {addSeat.WholeDayImage && <img src={`http://localhost:3000/Images/${addSeat.WholeDayImage}`} className='imageCode' alt="24 Hour Code" />}
              </label>
              <div className="button">
                  <button type="submit" className="submit-button-reservation" onClick={submitHandler}>Save</button>
              </div>
          </form>
      </div>
  </div>
);

};

export default AddSeatForm;