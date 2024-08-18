
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
 import './OngoingReservationTable.css'
// Helper function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
};

// Helper function to format time
const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${strMinutes} ${ampm}`;
};



const OngoingReservationTable = ({ user = [] }) => {
    const [users, setUsers] = useState(user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/history-table');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
    
        fetchUsers();
    }, []);
    

    return (
        <div className="conn">
            <div className="history-heading">
                <h3>Ongoing Reservation</h3>
            </div>
            <div className="history-container1">
                <div className="button-reservation-add">
                    <NavLink to={'/admin/add-reservation'} className="add-reservation-button">
                        Add Reservation
                    </NavLink>
                </div>
                <table className="history-table">
                    <thead>
                        <tr>
                            <th className="title">Name</th>
                            <th className="title">Seat Number</th>
                            <th className="title">Internet Hours</th>
                            <th className="title">Start Date</th>
                            <th className="title">Start Time</th>
                            <th className="title">Expected End Date</th>
                            <th className="title">Expected End Time</th>
                            <th className="title">END</th>
                   
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td className="data">{user.name}</td>
                                    <td className="data">{user.seatNumber}</td>
                                    <td className="data">{user.internetHours} hr</td>
                                    <td className="data">{formatDate(user.startDate)}</td>
                                    <td className="data">{formatTime(user.startTime)}</td>
                                    <td className="data">{formatTime(user.startTime)}</td>
                                    <td className="data">{formatTime(user.startTime)}</td>
                                    <td className="data">
                                        <button>END</button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="data">No users available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OngoingReservationTable;
