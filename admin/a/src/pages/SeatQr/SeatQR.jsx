import { useEffect, useState } from 'react';
import SeatTable from '../../components/SeatTable/SeatTable';

const apiUrl = import.meta.env.VITE_API_URL;

const SeatQR = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
        const response = await fetch(`${apiUrl}/admin/seat-qr`);
        const data = await response.json();
        setSeats(data);
    } catch (error) {
        console.error('Error fetching seats:', error);
    }
  };

  return (
    <div>
      <SeatTable seat={seats} />
    </div>
  );
}

export default SeatQR;
