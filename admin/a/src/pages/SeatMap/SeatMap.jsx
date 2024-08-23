import { useState, useEffect } from 'react';
import AddSeats from '../../components/AddSeats/AddSeats';
import pic from '../SeatMap/map1.png';
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

                <div className="bothContainer">
                    <div className="seatContainer">
                        {seats.map(seat => (
                            <AddSeats key={seat.seatNumber} seat={seat} />
                        ))}
                    </div>

                    <div className="mapContainer">
                        <img src={pic} alt="Seat Map" className="seat-map-image" />

                    </div>
                </div>
                
                
            
        </div>
    );
}

export default SeatMap;
