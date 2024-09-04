import { useEffect, useState } from 'react';
import SeatTable from '../../components/SeatTable/SeatTable';

const SeatQR = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetchSeats();
  }, []);  // Empty array ensures this runs only once after the component mounts

  const fetchSeats = async () => {
    try {
        const response = await fetch('http://localhost:3000/admin/seat-qr');
        const data = await response.json();
        setSeats(data); // Update the state with the fetched data
    } catch (error) {
        console.error('Error fetching seats:', error);
    }
  };

  return (
    <div>
      <SeatTable seat={seats}/> {/* Pass the seats state to the SeatTable component */}
    </div>
  );
}

export default SeatQR;
