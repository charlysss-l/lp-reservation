import './SeatTable.css';
import { NavLink } from 'react-router-dom';
const SeatTable = ({ seat = [] }) => {  // Ensure the prop name matches
    return (
        <div className="conn">
            <div className="seatTable-heading">
                <h3>Seat Details</h3>
            </div>
            <div className="seatTable-container">
                <div className="button-seat">
                <NavLink to={'/admin/add-seat'} className="add-seat-button">
                    Add Seat 
                </NavLink>
                </div>

                <table className="seat-table">

                    <thead>
                        <tr>
                            <th className="title">SeatID</th>
                            <th className="title">Seat Number</th>
                            <th className="title">3hr Internet Code</th>
                            <th className="title">24hr Internet Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seat.map((seats, index) => (  // Loop over the seat array
                            <tr key={index}>
                                <td className="data">{seats.seat_id}</td>
                                <td className="data">{seats.seatNumber}</td>
                                <td className="data">{seats.ThreeHourCode}</td>
                                <td className="data">{seats.WholeDayCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SeatTable;

