import './SeatTable.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const removeSeat = async (seat_id, onSeatRemoved) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this seat?');

    if (isConfirmed) {
        try {
            const response = await fetch('http://localhost:3000/admin/remove-seat', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seat_id }),
            });

            if (response.ok) {
                alert('Seat is removed');
                if (onSeatRemoved) onSeatRemoved(seat_id);
            } else {
                const errorData = await response.json();
                alert(`Failed to remove the seat: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to remove the seat');
        }
    }
};

const SeatTable = ({ seat = [] }) => {
    const [seats, setSeats] = useState(seat);

    useEffect(() => {
        setSeats(seat);
    }, [seat]);

    const handleSeatRemoved = (seat_id) => {
        setSeats(prevSeats => prevSeats.filter(seat => seat.seat_id !== seat_id));
    };

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
                            <th className="title">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seats.length > 0 ? (
                            seats.map((seat, index) => (
                                <tr key={index}>
                                    <td className="data">{seat.seat_id}</td>
                                    <td className="data">{seat.seatNumber}</td>
                                    <td className="data">{seat.ThreeHourCode}</td>
                                    <td className="data">{seat.WholeDayCode}</td>
                                    <td className="data">
                                        <button
                                            type="button"
                                            onClick={() => removeSeat(seat.seat_id, handleSeatRemoved)}
                                            className="delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="data">No seats available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SeatTable;
