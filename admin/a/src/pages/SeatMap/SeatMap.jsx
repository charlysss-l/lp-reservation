import { useState, useEffect } from 'react';
import AddSeats from '../../components/AddSeats/AddSeats';
import SeatTable from '../../components/SeatTable/SeatTable';
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
                    <AddSeats key={seat.seat_id} seatNumber={seat.seatNumber} />,
                    <SeatTable key={table.table_id} tableNumber={table.tableNumber} />

                    
                ))}
                <div class="container">
                    <div class="box">1
                        <AddSeats seatNumber="20" style={{ position: 'relative', top: '127px', left: '-70px' }} />
                        <AddSeats seatNumber="21" style={{ position: 'relative', top: '15px', left: '-70px' }} />
                        <AddSeats seatNumber="22" style={{ position: 'relative', top: '-97px', left: '-70px' }} />
              
                        <SeatTable tableNumber="T20" style={{ position: 'relative', top: '114px', left: '-140px' }} />
                        <SeatTable tableNumber="T21" style={{ position: 'relative', top: '2px', left: '-140px' }} />
                        <SeatTable tableNumber="T22" style={{ position: 'relative', top: '-110px', left: '-140px' }} />
                    </div>
                    <div class="box">2
                    <AddSeats seatNumber="15" style={{ position: 'relative', top: '90px', left: '-20px' }} />
                    <AddSeats seatNumber="16" style={{ position: 'relative', top: '-91px', left: '-20px' }} />
                    <SeatTable tableNumber="T15" style={{ position: 'relative', top: '30px', left: '-53px' ,width: '150px', height: '95px' }} />
                    <SeatTable tableNumber="T16" style={{ position: 'relative', top: '-41px', left: '-53px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div class="box">3
                    <AddSeats seatNumber="13" style={{ position: 'relative', top: '90px', left: '-20px' }} />
                    <AddSeats seatNumber="14" style={{ position: 'relative', top: '-91px', left: '-20px' }} />
                    <SeatTable tableNumber="T13" style={{ position: 'relative', top: '30px', left: '-53px' ,width: '150px', height: '95px' }} />
                    <SeatTable tableNumber="T14" style={{ position: 'relative', top: '-41px', left: '-53px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div class="box">4</div>
                    <div class="box">5
                    <AddSeats seatNumber="5" style={{ position: 'relative', top: '90px', left: '20px' }} />
                    <AddSeats seatNumber="6" style={{ position: 'relative', top: '-91px', left: '20px' }} />
                    <SeatTable tableNumber="T5" style={{ position: 'relative', top: '30px', left: '-13px' ,width: '150px', height: '95px' }} />
                    <SeatTable tableNumber="T6" style={{ position: 'relative', top: '-41px', left: '-13px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div class="box">6
                        <div className="available"> AVAILABLE </div>
                        <div className="reserved"> RESERVED </div>


                    </div>
                    <div class="box">7</div>
                    <div class="box">8
                    <AddSeats seatNumber="11" style={{ position: 'relative', top: '90px', left: '33px' }} />
                    <AddSeats seatNumber="12" style={{ position: 'relative', top: '-91px', left: '33px' }} />
                    <SeatTable tableNumber="T11" style={{ position: 'relative', top: '30px', left: '-0px' ,width: '150px', height: '95px' }} />
                    <SeatTable tableNumber="T12" style={{ position: 'relative', top: '-41px', left: '-0px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div class="box">9
                    <AddSeats seatNumber="9" style={{ position: 'relative', top: '90px', left: '13px' }} />
                    <AddSeats seatNumber="10" style={{ position: 'relative', top: '-91px', left: '13px' }} />
                    <SeatTable tableNumber="T9" style={{ position: 'relative', top: '30px', left: '-20px' ,width: '150px', height: '95px' }} />
                    <SeatTable tableNumber="T10" style={{ position: 'relative', top: '-41px', left: '-20px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div class="box">10
                    <AddSeats seatNumber="7" style={{ position: 'relative', top: '190px', left: '43px' }} />
                    <AddSeats seatNumber="8" style={{ position: 'relative', top: '1px', left: '43px' }} />
                    <SeatTable tableNumber="T7" style={{ position: 'relative', top: '130px', left: '10px' ,width: '150px', height: '95px' }} />
                    <SeatTable tableNumber="T8" style={{ position: 'relative', top: '58px', left: '10px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div class="box">11
                    
                    </div>
                    <div class="box">12
                        <AddSeats seatNumber="1" style={{ position: 'relative', top: '186px', left: '-5px' }} />
                        <AddSeats seatNumber="2" style={{ position: 'relative', top: '75px', left: '-5px' }} />
                        <AddSeats seatNumber="3" style={{ position: 'relative', top: '-36px', left: '-5px' }} />
                        <AddSeats seatNumber="4" style={{ position: 'relative', top: '-146px', left: '-5px' }} />
              
                        <SeatTable tableNumber="T1" style={{ position: 'relative', top: '173px', left: '45px' }} />
                        <SeatTable tableNumber="T2" style={{ position: 'relative', top: '62px', left: '45px' }} />
                        <SeatTable tableNumber="T3" style={{ position: 'relative', top: '-49px', left: '45px' }} />
                        <SeatTable tableNumber="T4" style={{ position: 'relative', top: '-160px', left: '45px' }} />
                        
                    </div>
                    <div class="box">13
                        <AddSeats seatNumber="17" style={{ position: 'relative', top: '-2px', left: '-70px' }} />
                        <AddSeats seatNumber="18" style={{ position: 'relative', top: '-114px', left: '-70px' }} />
                        <AddSeats seatNumber="19" style={{ position: 'relative', top: '-225px', left: '-70px' }} />
              
                        <SeatTable tableNumber="T17" style={{ position: 'relative', top: '-15px', left: '-140px' }} />
                        <SeatTable tableNumber="T18" style={{ position: 'relative', top: '-127px', left: '-140px' }} />
                        <SeatTable tableNumber="T19" style={{ position: 'relative', top: '-239px', left: '-140px' }} />
                    </div>
                    <div class="box">14</div>
                    <div class="box">15</div>
                    <div class="box">16</div>
                    <div class="box">17</div>
                    <div class="box">18</div>
    </div>
                
                
            </div>
          
        </div>
    );
}

export default SeatMap;
