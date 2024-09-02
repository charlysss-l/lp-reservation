import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AddSeatForm.css';

function AddSeatForm({ seatToEdit, onSaveSeat }) {
  const [seatData, setSeatData] = useState({
    seat_id: null,
    seatNumber: "",
    ThreeHourImage: "",
    WholeDayImage: "",
    ThreeHourImageFile: null,
    WholeDayImageFile: null
  });

  const threeHourImageInputRef = useRef(null);
  const wholeDayImageInputRef = useRef(null);

  useEffect(() => {
    if (seatToEdit) {
      setSeatData({
        seat_id: seatToEdit.seat_id,
        seatNumber: seatToEdit.seatNumber,
        ThreeHourImage: seatToEdit.ThreeHourCode,
        WholeDayImage: seatToEdit.WholeDayCode,
        ThreeHourImageFile: null,
        WholeDayImageFile: null
      });
    }
  }, [seatToEdit]);

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
      setSeatData(prev => ({
        ...prev,
        [type]: imageUrl,
        [`${type}File`]: file
      }));
    }
  };

  const changeHandler = (e) => {
    setSeatData({ ...seatData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = seatData.seat_id ? 'http://localhost:3000/admin/update-seat' : 'http://localhost:3000/admin/add-seat';
    const method = seatData.seat_id ? 'PUT' : 'POST';

    try {
      const response = await axios({
        method: method,
        url: url,
        data: {
          seat_id: seatData.seat_id,
          seatNumber: seatData.seatNumber,
          ThreeHourImage: seatData.ThreeHourImage,
          WholeDayImage: seatData.WholeDayImage,
        }
      });

      alert(seatData.seat_id ? 'Seat updated' : 'Seat added');
      if (onSaveSeat) onSaveSeat(response.data.seatNumber || response.data.seat_id);

      // Clear input fields and image previews
      setSeatData({
        seat_id: null,
        seatNumber: "",
        ThreeHourImage: "",
        WholeDayImage: "",
        ThreeHourImageFile: null,
        WholeDayImageFile: null
      });
      threeHourImageInputRef.current.value = null;
      wholeDayImageInputRef.current.value = null;
    } catch (err) {
      console.error('Error:', err);
      alert(`Error ${seatData.seat_id ? 'updating' : 'adding'} seat`);
    }
  };

  return (
    <div className="div-con">
      <h2 className="add-reservation-title">{seatData.seat_id ? 'Edit Seat' : 'Add Seat'}</h2>
      <div className="add-reservation-form">
        <form>
          <label>
            Seat Number:
            <input type="text" name="seatNumber" onChange={changeHandler} value={seatData.seatNumber} />
          </label>
          <label>
            Code for 3 Hours:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'ThreeHourImage')}
              ref={threeHourImageInputRef}
            />
            {seatData.ThreeHourImage && <img src={`http://localhost:3000/Images/${seatData.ThreeHourImage}`} className='imageCode' alt="3 Hour Code" />}
          </label>
          <label>
            Code for 24 Hours:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'WholeDayImage')}
              ref={wholeDayImageInputRef}
            />
            {seatData.WholeDayImage && <img src={`http://localhost:3000/Images/${seatData.WholeDayImage}`} className='imageCode' alt="24 Hour Code" />}
          </label>
          <div className="button">
            <button type="submit" className="submit-button-reservation" onClick={submitHandler}>
              {seatData.seat_id ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSeatForm;


// import { useState, useRef } from 'react';
// import axios from 'axios';
// import './AddSeatForm.css';

// function AddSeatForm({ onAddSeat }) {
//   const [addSeat, setAddSeat] = useState({
//     seatNumber: "",
//     ThreeHourImage: "",
//     WholeDayImage: "",
//     ThreeHourImageFile: null,
//     WholeDayImageFile: null
//   });

//   const threeHourImageInputRef = useRef(null); // Reference for 3-hour image input
//   const wholeDayImageInputRef = useRef(null); // Reference for 24-hour image input

//   const imageHandler = async (file) => {
//     let formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:3000/upload-seat-image', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       if (response.data.success) {
//         return response.data.imageUrl;
//       }
//     } catch (err) {
//       console.error('Error uploading image:', err);
//       alert('Error uploading image');
//     }
//     return "";
//   };

//   const handleImageChange = async (e, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = await imageHandler(file);
//       if (type === 'ThreeHourImage') {
//         setAddSeat(prev => ({ ...prev, ThreeHourImage: imageUrl, ThreeHourImageFile: file }));
//       } else {
//         setAddSeat(prev => ({ ...prev, WholeDayImage: imageUrl, WholeDayImageFile: file }));
//       }
//     }
//   };

//   const changeHandler = (e) => {
//     setAddSeat({ ...addSeat, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/admin/add-seat', {
//         seatNumber: addSeat.seatNumber,
//         ThreeHourImage: addSeat.ThreeHourImage, // Include image URL
//         WholeDayImage: addSeat.WholeDayImage   // Include image URL
//       });
//       alert('Seat added');
//       if (onAddSeat) onAddSeat(response.data.seatNumber); // Pass the new seat data
      
//       // Clear input fields and image previews
//       setAddSeat({
//         seatNumber: "",
//         ThreeHourImage: "",
//         WholeDayImage: "",
//         ThreeHourImageFile: null,
//         WholeDayImageFile: null
//       });
//       threeHourImageInputRef.current.value = null; // Clear 3-hour image input
//       wholeDayImageInputRef.current.value = null; // Clear 24-hour image input
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Error adding seat');
//     }
//   };

//   return (
//     <div className="div-con">
//       <h2 className="add-reservation-title">Add Seats</h2>
//       <div className="add-reservation-form">
//         <form>
//           <label>
//             Seat Number:
//             <input type="text" name="seatNumber" onChange={changeHandler} value={addSeat.seatNumber} />
//           </label>
//           <label>
//             Code for 3 Hours:
//             <input
//               type="file"
//               onChange={(e) => handleImageChange(e, 'ThreeHourImage')}
//               ref={threeHourImageInputRef}
//             />
//             {addSeat.ThreeHourImage && <img src={`http://localhost:3000/Images/${addSeat.ThreeHourImage}`} className='imageCode' alt="3 Hour Code" />}
//           </label>
//           <label>
//             Code for 24 Hours:
//             <input
//               type="file"
//               onChange={(e) => handleImageChange(e, 'WholeDayImage')}
//               ref={wholeDayImageInputRef}
//             />
//             {addSeat.WholeDayImage && <img src={`http://localhost:3000/Images/${addSeat.WholeDayImage}`} className='imageCode' alt="24 Hour Code" />}
//           </label>
//           <div className="button">
//             <button type="submit" className="submit-button-reservation" onClick={submitHandler}>Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddSeatForm;
