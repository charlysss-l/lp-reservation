import './HistoryTable.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

const removeUser = async (user_id, onUserRemoved) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this user?');

    if (isConfirmed) {
        try {
            const response = await fetch('http://localhost:3000/admin/remove-user', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id }),
            });
            if (response.ok) {
                alert('User is removed');
                if (onUserRemoved) onUserRemoved(user_id);
            } else {
                const errorData = await response.json();
                alert(`Failed to remove the user: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to remove the user');
        }
    }
};

const HistoryTable = ({ user = [] }) => {
    const [users, setUsers] = useState(user);

    useEffect(() => {
        setUsers(user);
    }, [user]);

    const handleUserRemoved = (user_id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.user_id !== user_id));
    };

    return (
        <div className="conn">
            <div className="history-heading">
                <h3>Reservation History</h3>
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
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td className="data">{user.user_id}</td>
                                    <td className="data">{user.name}</td>
                                    <td className="data">{user.email}</td>
                                    <td className="data">{user.contactNumber}</td>
                                    <td className="data">{user.company}</td>
                                    <td className="data">{user.seatNumber}</td>
                                    <td className="data">{user.internetHours} hr</td>
                                    <td className="data">{formatDate(user.startDate)}</td>
                                    <td className="data">{formatTime(user.startTime)}</td>
                                    <td className="data">{user.code || 'N/A'}</td> {/* Fallback to 'N/A' if no code */}
                                    <td className="data">
                                        <button
                                            type="button"
                                            onClick={() => removeUser(user.user_id, handleUserRemoved)}
                                            className="delete"
                                        >
                                            Delete
                                        </button>
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

export default HistoryTable;
