import { useState, useEffect } from 'react';
import AddSeats from '../../components/AddSeats/AddSeats';
import TablePerSeat from '../../components/TablePerSeat/TablePerSeat';
import './SeatMap.css';

const SeatMap = () => {
    const [seats] = useState([]);
    const [tables] = useState([]);




    return (
        <div className="main-container-reservation">
            <h2 className="seatMap-title">Seat Map</h2>
            <div className="seatContainer">
                {seats.map(seat => (
                    <AddSeats key={seat.seat_id} seatNumber={seat.seatNumber} style={seat.style} />
                ))}
                {tables.map(table => (
                    <TablePerSeat key={table.table_id} tableNumber={table.tableNumber} style={table.style} />
                ))}
                <div className="container">
                    <div className="box">1
                        <AddSeats seatNumber="20" style={{ position: 'relative', top: '127px', left: '-70px' }} />
                        <AddSeats seatNumber="21" style={{ position: 'relative', top: '15px', left: '-70px' }} />
                        <AddSeats seatNumber="22" style={{ position: 'relative', top: '-97px', left: '-70px' }} />
                        <TablePerSeat tableNumber="T20" style={{ position: 'relative', top: '114px', left: '-140px' }} />
                        <TablePerSeat tableNumber="T21" style={{ position: 'relative', top: '2px', left: '-140px' }} />
                        <TablePerSeat tableNumber="T22" style={{ position: 'relative', top: '-110px', left: '-140px' }} />
                    </div>

                    <div className="box">2
                    <AddSeats seatNumber="15" style={{ position: 'relative', top: '90px', left: '-20px' }} />
                    <AddSeats seatNumber="16" style={{ position: 'relative', top: '-91px', left: '-20px' }} />
                    <TablePerSeat tableNumber="T15" style={{ position: 'relative', top: '30px', left: '-53px' ,width: '150px', height: '95px' }} />
                    <TablePerSeat tableNumber="T16" style={{ position: 'relative', top: '-41px', left: '-53px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div className="box">3
                    <AddSeats seatNumber="13" style={{ position: 'relative', top: '90px', left: '-20px' }} />
                    <AddSeats seatNumber="14" style={{ position: 'relative', top: '-91px', left: '-20px' }} />
                    <TablePerSeat tableNumber="T13" style={{ position: 'relative', top: '30px', left: '-53px' ,width: '150px', height: '95px' }} />
                    <TablePerSeat tableNumber="T14" style={{ position: 'relative', top: '-41px', left: '-53px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div className="box">4</div>
                    <div className="box">5
                    <AddSeats seatNumber="5" style={{ position: 'relative', top: '90px', left: '20px' }} />
                    <AddSeats seatNumber="6" style={{ position: 'relative', top: '-91px', left: '20px' }} />
                    <TablePerSeat tableNumber="T5" style={{ position: 'relative', top: '30px', left: '-13px' ,width: '150px', height: '95px' }} />
                    <TablePerSeat tableNumber="T6" style={{ position: 'relative', top: '-41px', left: '-13px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div className="box">6
                        <div className="available"> AVAILABLE </div>
                        <div className="reserved"> RESERVED </div>


                    </div>
                    <div className="box">7</div>
                    <div className="box">8
                    <AddSeats seatNumber="11" style={{ position: 'relative', top: '90px', left: '33px' }} />
                    <AddSeats seatNumber="12" style={{ position: 'relative', top: '-91px', left: '33px' }} />
                    <TablePerSeat tableNumber="T11" style={{ position: 'relative', top: '30px', left: '-0px' ,width: '150px', height: '95px' }} />
                    <TablePerSeat tableNumber="T12" style={{ position: 'relative', top: '-41px', left: '-0px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div className="box">9
                    <AddSeats seatNumber="9" style={{ position: 'relative', top: '90px', left: '13px' }} />
                    <AddSeats seatNumber="10" style={{ position: 'relative', top: '-91px', left: '13px' }} />
                    <TablePerSeat tableNumber="T9" style={{ position: 'relative', top: '30px', left: '-20px' ,width: '150px', height: '95px' }} />
                    <TablePerSeat tableNumber="T10" style={{ position: 'relative', top: '-41px', left: '-20px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div className="box">10
                    <AddSeats seatNumber="7" style={{ position: 'relative', top: '190px', left: '43px' }} />
                    <AddSeats seatNumber="8" style={{ position: 'relative', top: '1px', left: '43px' }} />
                    <TablePerSeat tableNumber="T7" style={{ position: 'relative', top: '130px', left: '10px' ,width: '150px', height: '95px' }} />
                    <TablePerSeat tableNumber="T8" style={{ position: 'relative', top: '58px', left: '10px' ,width: '150px', height: '95px' }} />
                    </div>
                    <div className="box">11
                    
                    </div>
                    <div className="box">12
                        <AddSeats seatNumber="1" style={{ position: 'relative', top: '186px', left: '-5px' }} />
                        <AddSeats seatNumber="2" style={{ position: 'relative', top: '75px', left: '-5px' }} />
                        <AddSeats seatNumber="3" style={{ position: 'relative', top: '-36px', left: '-5px' }} />
                        <AddSeats seatNumber="4" style={{ position: 'relative', top: '-146px', left: '-5px' }} />
              
                        <TablePerSeat tableNumber="T1" style={{ position: 'relative', top: '173px', left: '45px' }} />
                        <TablePerSeat tableNumber="T2" style={{ position: 'relative', top: '62px', left: '45px' }} />
                        <TablePerSeat tableNumber="T3" style={{ position: 'relative', top: '-49px', left: '45px' }} />
                        <TablePerSeat tableNumber="T4" style={{ position: 'relative', top: '-160px', left: '45px' }} />
                        
                    </div>
                    <div className="box">13
                        <AddSeats seatNumber="17" style={{ position: 'relative', top: '-2px', left: '-70px' }} />
                        <AddSeats seatNumber="18" style={{ position: 'relative', top: '-114px', left: '-70px' }} />
                        <AddSeats seatNumber="19" style={{ position: 'relative', top: '-225px', left: '-70px' }} />
              
                        <TablePerSeat tableNumber="T17" style={{ position: 'relative', top: '-15px', left: '-140px' }} />
                        <TablePerSeat tableNumber="T18" style={{ position: 'relative', top: '-127px', left: '-140px' }} />
                        <TablePerSeat tableNumber="T19" style={{ position: 'relative', top: '-239px', left: '-140px' }} />
                    </div>
                    <div className="box">14</div>
                    <div className="box">15</div>
                    <div className="box">16</div>
                    <div className="box">17</div>
                    <div className="box">18</div>
    </div>
                
                
            </div>
          
        </div>
    );
}

export default SeatMap;
