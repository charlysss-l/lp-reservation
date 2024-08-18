import './AddSeats.css';

const AddSeats = ({ seatNumber }) => {
  return (
    <div className="main-container">
      <button className="seat">
        {seatNumber}
      </button>
    </div>
  );
}

export default AddSeats;
