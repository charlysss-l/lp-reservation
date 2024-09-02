import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './EditSeatForm.css';

function EditSeatForm() {
  const { seatId } = useParams();
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
    const fetchSeatData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/admin/seat/${seatId}`);
          
          if (!response.ok) {
            const errorText = await response.text(); // Get the response body if available
            console.error('Failed to fetch seat data. Status:', response.status, 'Error:', errorText);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          setSeatData({
            seat_id: data.seat_id,
            seatNumber: data.seatNumber,
            ThreeHourImage: data.ThreeHourCode,
            WholeDayImage: data.WholeDayCode,
            ThreeHourImageFile: null,
            WholeDayImageFile: null
          });
        } catch (error) {
          console.error('Error fetching seat data:', error);
          alert('Error fetching seat data. Please check the console for details.');
        }
      };
      

    fetchSeatData();
  }, [seatId]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload-seat-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      if (result.success) {
        return result.imageUrl;
      } else {
        throw new Error(result.message || 'Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
      return '';
    }
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      setSeatData(prev => ({
        ...prev,
        [type]: imageUrl,
        [`${type}File`]: file
      }));
    }
  };

  const handleChange = (e) => {
    setSeatData({ ...seatData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/update-seat', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seat_id: seatData.seat_id,
          seatNumber: seatData.seatNumber,
          ThreeHourImage: seatData.ThreeHourImage,
          WholeDayImage: seatData.WholeDayImage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update seat');
      }

      alert('Seat updated successfully');
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
    } catch (error) {
      console.error('Error updating seat:', error);
      alert('Error updating seat. Please check the console for details.');
    }
  };

  return (
    <div className="div-con">
      <h2 className="edit-reservation-title">Edit Seat</h2>
      <div className="edit-reservation-form">
        <form onSubmit={handleSubmit}>
          <label>
            Seat Number:
            <input
              type="text"
              name="seatNumber"
              onChange={handleChange}
              value={seatData.seatNumber}
            />
          </label>
          <label>
            Code for 3 Hours:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'ThreeHourImage')}
              ref={threeHourImageInputRef}
            />
            {seatData.ThreeHourImage && <img src={`http://localhost:3000/Images/${seatData.ThreeHourImage}`} alt="3 Hour Code" />}
          </label>
          <label>
            Code for 24 Hours:
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'WholeDayImage')}
              ref={wholeDayImageInputRef}
            />
            {seatData.WholeDayImage && <img src={`http://localhost:3000/Images/${seatData.WholeDayImage}`} alt="24 Hour Code" />}
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditSeatForm;
