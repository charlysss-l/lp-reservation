import './AddReservation.css'
import AddSeats from '../AddSeats/AddSeats';
import {NavLink } from 'react-router-dom'
const AddReservation = () => {

  return (
    <div className="div con">
    {/*Div for form */}
    <div className="add-reservation-form">
        <h2 className="add-reservation-title">Add Reservation</h2>
        <form >
            <label>
            Name:
            <input type="text" name="name"  />
            </label>
            <label>
            Start Date:
            <input type="date" name="startDate"   />
            </label>
            <label>
            Start Time:
            <input type="time" name="startTime"  />
            </label>
            <label>
            End Date:
            <input type="date" name="endDate"  />
            </label>
            <label>
            Total Time:
            <input type="text" name="totalTime"  />
            </label>
            <label>
            Seat Number:
            <input type="text" name="seatNumber"  />
            </label>
            <div className="button">
            <button type="submit" className="submit-button-reservation">Save</button>
            <NavLink to={'/admin/add-receipt'} className="receipt-button">View Receipt</NavLink>
            </div>
            
        </form>
    </div>

     {/*Div for seats */}    
    <div className="main-container-map">
      <h2 className="seatMap-title">Seat Map</h2>
      <div className="seatContainer">
          <AddSeats />
          <AddSeats />
          <AddSeats />
          <AddSeats />

      </div>
    </div>
    </div>
   
    
  );
}

export default AddReservation;
