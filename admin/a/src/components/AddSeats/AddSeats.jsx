import { useNavigate } from 'react-router-dom';
import './AddSeats.css';

const AddSeats = ({ seatNumber, style }) => {
  const navigate = useNavigate();

  const handleSeatClick = () => {
    navigate('/admin/add-reservation', { state: { seatNumber } });
  };

  return (
    <div className="main-container-seat" style={style}>
      <button className="seat" onClick={handleSeatClick}>
        {seatNumber}
      </button>
    </div>
  );
}

export default AddSeats;
