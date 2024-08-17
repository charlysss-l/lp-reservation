import AddSeats from "../../components/AddSeats/AddSeats";
import './SeatMap.css';

const SeatMap = () => {

  return (
    <div className="main-container-reservation">
      <h2 className="seatMap-title">Seat Map</h2>
      <div className="seatContainer">
          <AddSeats />
          <AddSeats />
          <AddSeats />
          <AddSeats />
      </div>
      
    </div>
  );
}

export default SeatMap;
