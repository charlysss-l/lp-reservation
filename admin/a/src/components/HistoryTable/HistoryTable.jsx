import './HistoryTable.css';
import { useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;



const removeUser = async (user_id, onUserRemoved) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this user?');

    if (isConfirmed) {
        try {
            const response = await fetch(`${apiUrl}/admin/remove-user`, {
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
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 7;

    useEffect(() => {
        setUsers(user);
    }, [user]);

    const handleUserRemoved = (user_id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.user_id !== user_id));
    };

    const handleClickPageNumber = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className="connt">
            <h2 className="table-title">Reservation History</h2>
            <div className="history-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th className="title">Seat Number</th>
                            <th className="title">Name</th>
                            <th className="title">Email</th>
                            <th className="title">Contact Number</th>
                            <th className="title">Company</th>
                            <th className="title">Internet Hours</th>
                            <th className="title">Start Date</th>
                            <th className="title">Start Time</th>
                            <th className="title">End Date</th>
                            <th className="title">End Time</th>
                            <th className="title">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={index}>
                                    <td className="data">{user.seatNumber}</td>
                                    <td className="data">{user.name}</td>
                                    <td className="data">{user.email}</td>
                                    <td className="data">{user.contactNumber}</td>
                                    <td className="data">{user.company}</td>
                                    <td className="data">{user.internetHours} hr</td>
                                    <td className="data">{user.startDate}</td>
                                    <td className="data">{user.startTime}</td>
                                    <td className="data">{user.finalEndDate ? user.finalEndDate : 'Ongoing'}</td>
                                    <td className="data">{user.finalEndTime ? user.finalEndTime : 'Ongoing'}</td>
                                    <td className="data">
                                        <button
                                            type="button"
                                            onClick={() => removeUser(user.user_id, handleUserRemoved)}
                                            className="delete">
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
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handleClickPageNumber(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryTable;
