import { useState, useEffect } from 'react';
import AddSeats from '../../components/AddSeats/AddSeats';
import './SeatMap.css';

const SeatMap = () => {
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/seat-qr');
                const data = await response.json();
                setSeats(data);
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        };

        fetchSeats();
    }, []);

    return (
        <div className="main-container-reservation">
            <h2 className="seatMap-title">Seat Map</h2>
            <div className="seatContainer">
                {seats.map(seat => (
                    <AddSeats key={seat.seat_id} seat={seat} />
                ))}
            </div>
        </div>
    );
}

export default SeatMap;
