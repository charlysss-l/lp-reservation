import { useState, useEffect } from 'react';
import AddSeats from '../../components/AddSeats/AddSeats';
import './SeatMap.css';
const SeatMap = () => {
    const [seats, setSeats] = useState([]);

    // Fetch initial seats from the server (if needed)
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

    // Function to add a new seat to the state
    const handleAddSeat = (newSeat) => {
        setSeats(prevSeats => [...prevSeats, newSeat]);
    };

    return (
        <div className="main-container-reservation">
            <h2 className="seatMap-title">Seat Map</h2>
            <div className="seatContainer">
                {seats.map(seat => (
                    <AddSeats key={seat.seat_id} seatNumber={seat.seatNumber} />
                ))}
            </div>
          
        </div>
    );
}

export default SeatMap;
