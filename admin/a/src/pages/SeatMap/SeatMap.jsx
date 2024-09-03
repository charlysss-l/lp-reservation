import { useState, useEffect } from 'react';
import AddSeats from '../../components/AddSeats/AddSeats';
import axios from 'axios';
import './SeatMap.css';

const apiUrl = import.meta.env.VITE_API_URL;

function SeatMap() {
    const [seats, setSeats] = useState([]);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState('');

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`${apiUrl}/upload`, formData);

            const response = await axios.get(`${apiUrl}/getImage`);
            if (response.data.length > 0) {
                const latestImage = response.data[0].image;
                setImage(latestImage);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        axios.get(`${apiUrl}/getImage`)
            .then(res => {
                const latestImage = res.data[0];
                setImage(latestImage.image);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(`${apiUrl}/admin/seat-qr`);
                const data = await response.json();
                setSeats(data);
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        };

        fetchSeats();
    }, []);

    const getImageUrl = () => {
        return `${apiUrl}/Images/${image}?t=${new Date().getTime()}`;
    };

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
                    {image && <img src={getImageUrl()} alt="Seat Map" />}
                    <br />
                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
}

export default SeatMap;
