import React, { useState } from 'react';
import './AddSeats.css';

const AddSeats = () => {
  const [colorState, setColorState] = useState(0);

  const handleClick = () => {
    setColorState((prevColorState) => (prevColorState + 1) % 3);
  };

  const getButtonStyle = () => {
    switch (colorState) {
      case 0:
        return { backgroundColor: 'rgb(15, 172, 15)', color: 'white' }; 
      case 1:
        return { backgroundColor: 'red', color: 'white' }; // Red
      default:
        return { backgroundColor: 'rgb(15, 172, 15)', color: 'white' };
    }
  };

  return (
    <div className="main-container">
      <button 
        className="seat" 
        onClick={handleClick} 
        style={getButtonStyle()}
      >
        {colorState === 1 ? 'Reserved' : 'Available'}
      </button>
    </div>
  );
}

export default AddSeats;
