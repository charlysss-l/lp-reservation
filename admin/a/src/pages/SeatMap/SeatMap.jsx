import { useEffect, useState } from 'react';
import AddSeats from '../../components/AddSeats/AddSeats';
import axios from 'axios';
import { imageDb } from '../../../../../backend/config';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import './SeatMap.css';
const apiUrl = import.meta.env.VITE_API_URL;

function SeatMap() {
    const [seats, setSeats] = useState([]);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [notifications, setNotifications] = useState({});
    const [showNotifications, setShowNotifications] = useState(false);

    const handleUpload = async () => {
        if (file !== null) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            try {
                const uploadResult = await uploadBytes(imgRef, file);
                const url = await getDownloadURL(uploadResult.ref);
                setImageUrl(url);

                // After successfully uploading to Firebase, save the image URL to your backend
                await axios.post(`${apiUrl}/upload-image-url`, { imageUrl: url });
            } catch (error) {
                console.error("Error uploading image to Firebase:", error);
            }
        }
    };

    useEffect(() => {
        axios.get(`${apiUrl}/getImage`)
            .then(res => {
                const latestImage = res.data[0]; // Assuming the latest image is first
                setImageUrl(latestImage.image);
            })
            .catch(err => console.log(err));
    }, []);

    const getImageUrl = () => {
        return imageUrl ? imageUrl : '';
    };

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(`${apiUrl}/admin/seat-qr`);
                const data = await response.json();
                setSeats(data);

                // Load notifications from local storage
                const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
                setNotifications(storedNotifications);

                // Check for new notifications
                const updatedNotifications = data.reduce((acc, seat) => {
                    const endTime = new Date(seat.expectedEndTime).getTime();
                    const currentTime = new Date().getTime();
                    const notifyTime = endTime - 15 * 60 * 1000; // Notify 15 minutes before

                    if (notifyTime > currentTime) {
                        const timeoutDuration = notifyTime - currentTime;
                        setTimeout(() => {
                            const newNotification = `Seat ${seat.seatNumber} is about to end soon.`;
                            const newNotifications = {
                                ...storedNotifications,
                                [seat.seatNumber]: newNotification
                            };
                            setNotifications(newNotifications);
                            localStorage.setItem('notifications', JSON.stringify(newNotifications));
                        }, timeoutDuration);
                    }

                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        };

        fetchSeats();
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleCloseNotification = (seatNumber) => {
        setNotifications(prevNotifications => {
            const newNotifications = { ...prevNotifications };
            delete newNotifications[seatNumber];
            localStorage.setItem('notifications', JSON.stringify(newNotifications));
            return newNotifications;
        });
    };

    return (
        <div className="main-container-reservation">
            <h2 className="seatMap-title">
                Seat Map
                <div className="notif">  
                {/* Notification button */}
                <button onClick={toggleNotifications} className="notification-button">
                    🔔 {/* This can be replaced with an actual icon */}
                    {Object.keys(notifications).length > 0 && (
                        <span className="notification-count">
                            {Object.keys(notifications).length}
                        </span>
                    )}
                </button>

                {/* Notification dropdown */}
                {showNotifications && Object.keys(notifications).length > 0 && (
                    <div className="notification-dropdown">
                        {Object.entries(notifications).map(([seatNumber, message]) => (
                            <div key={seatNumber} className="notification-item">
                                <p>{message}</p>
                                <button onClick={() => handleCloseNotification(seatNumber)} className="close-button">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
                <div className="fileUploadBtn">
                    <input type="file" onChange={e => setFile(e.target.files[0])} className="choose-photo"/>
                    <button className="uploadBtn" onClick={handleUpload}>Upload</button>
                </div>
            </h2>
            

            <div className="bothContainer">
                {seats.map(seat => (
                    <AddSeats key={seat.seatNumber} seat={seat} />
                ))}

                {imageUrl && <img className="floorMapImage" src={getImageUrl()} alt="Seat Map" />}

                <p>RESERVED SEATS</p>
            </div>
        </div>
    );
}

export default SeatMap;
