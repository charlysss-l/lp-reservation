import './HistoryTable.css';
import { NavLink } from 'react-router-dom';

// Helper function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
};

// Helper function to format time
const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${strMinutes} ${ampm}`;
};

const removeUser = async (user_id) => {
    await fetch('http://localhost:3000/admin/remove-user', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id:user_id})
        
    }).then((resp)=> {
        resp.ok? alert('Confirm deletion of User. ') : alert("Failed to remove the user")
    })

    
}

const HistoryTable = ({ user = [] }) => {
    return (
        <div className="conn">
            <div className="history-heading">
                <h3>Customer History</h3>
            </div>
            <div className="history-container">
                <div className="button-reservation-add">
                    <NavLink to={'/admin/add-reservation'} className="add-reservation-button">
                        Add Reservation
                    </NavLink>
                </div>
                <table className="history-table">
                    <thead>
                        <tr>
                            <th className="title">UserID</th>
                            <th className="title">Name</th>
                            <th className="title">Email</th>
                            <th className="title">Contact Number</th>
                            <th className="title">Company</th>
                            <th className="title">Seat Number</th>
                            <th className="title">Internet Hours</th>
                            <th className="title">Start Date</th>
                            <th className="title">Start Time</th>
                            <th className="title">Code</th>
                            <th className="title">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((users, index) => (
                            <tr key={index}>
                                <td className="data">{users.user_id}</td>
                                <td className="data">{users.name}</td>
                                <td className="data">{users.email}</td>
                                <td className="data">{users.contactNumber}</td>
                                <td className="data">{users.company}</td>
                                <td className="data">{users.seatNumber}</td>
                                <td className="data">{users.internetHours} hr</td>
                                <td className="data">{formatDate(users.startDate)}</td>
                                <td className="data">{formatTime(users.startTime)}</td>
                                <td className="data">{users.code}</td>
                                <td className="data"><button type="submit" onClick={() => {removeUser(users.user_id)}} className="delete">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
