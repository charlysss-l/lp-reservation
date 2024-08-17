
import  {useState} from 'react'
import axios from 'axios'

const AddSeatForm = () => {
  const [addSeat, seatAddSeats] = useState({
    seatNumber: "",
    ThreeHourCode: "",  // Match with the schema
    WholeDayCode: ""    // Match with the schema
  });

  const changeHandler = (e) => {
    seatAddSeats({ ...addSeat, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/admin/add-seat', {
            seatNumber: addSeat.seatNumber,
            ThreeHourCode: addSeat.ThreeHourCode,
            WholeDayCode: addSeat.WholeDayCode
        });
        console.log('Response:', response);
        alert('Seats added');
        seatAddSeats({
            seatNumber: "",
            ThreeHourCode: "",
            WholeDayCode: ""
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
          <div className="info1"></div>
          <label>
            Seat Number:
            <input type="text" name="seatNumber" onChange={changeHandler} value={addSeat.seatNumber} />
          </label>
          <label>
            Code for 3 Hours:
            <input type="text" name="ThreeHourCode" onChange={changeHandler} value={addSeat.ThreeHourCode} />
          </label>
          <label>
            Code for 24 Hours:
            <input type="text" name="WholeDayCode" onChange={changeHandler} value={addSeat.WholeDayCode} />
          </label>
          <div className="button">
            <button type="submit" className="submit-button-reservation" onClick={(e) => submitHandler(e)}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSeatForm