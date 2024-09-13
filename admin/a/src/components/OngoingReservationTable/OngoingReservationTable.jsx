import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OngoingReservationTable.css';

const apiUrl = import.meta.env.VITE_API_URL;

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
};

const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${strMinutes} ${ampm}`;
};

const formatInternetHours = (hours) => {
    switch (hours) {
        case '3':
            return '3 Hours';
        case '24':
            return 'Whole Day';
        case '168':
            return 'Weekly';
        case '720':
            return 'Monthly';
        default:
            return 'N/A';
    }
};

const OngoingReservationTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState({});
    const [notifications, setNotifications] = useState({});
    const [showNotifications, setShowNotifications] = useState(false);

    const usersPerPage = 7;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${apiUrl}/admin/history-table`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                const ongoingUsers = data.filter(user => !user.finalEndDate && !user.finalEndTime);

                const timers = ongoingUsers.reduce((acc, user) => {
                    const endTime = new Date(user.expectedEndTime).getTime();
                    const currentTime = new Date().getTime();
                    let timeLeft = endTime - currentTime;

                    const reservationStartTime = new Date(user.startTime).getTime();
                    const isNewReservation = (currentTime - reservationStartTime) <= 5 * 60 * 1000;

                    if (isNewReservation) {
                        timeLeft += 1 * 60 * 1000; // Add 30 seconds (30,000 milliseconds)
                    }

                    if (timeLeft > 0) {
                        acc[user.user_id] = timeLeft;
                    }

                    return acc;
                }, {});

                setTimeRemaining(timers);
                setUsers(ongoingUsers);

                const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || {};
                setNotifications(storedNotifications);

                ongoingUsers.forEach(user => {
                    const endTime = new Date(user.expectedEndTime).getTime();
                    const notifyTime = endTime - 15 * 60 * 1000;
                    const currentTime = new Date().getTime();

                    if (notifyTime > currentTime) {
                        const timeoutDuration = notifyTime - currentTime;
                        setTimeout(() => {
                            const newNotification = `Seat ${user.seatNumber} (${user.name}) is about to end in 15 minutes. And will automatically end at ${formatTime(user.expectedEndTime)}.`;
                            const updatedNotifications = {
                                ...storedNotifications,
                                [user.user_id]: newNotification
                            };
                            setNotifications(updatedNotifications);
                            localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
                        }, timeoutDuration);
                    }
                });
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(prevTimes => {
                const updatedTimes = { ...prevTimes };
    
                Object.keys(updatedTimes).forEach(userId => {
                    if (updatedTimes[userId] > 0) {
                        updatedTimes[userId] -= 1000;
                    } else {
                        delete updatedTimes[userId]; // Remove time but don't trigger the end
                    }
                });
    
                return updatedTimes;
            });
        }, 1000);
    
        return () => clearInterval(interval);
    }, [users]);
    

    const handleEndClick = (user) => {
        if (user) {
            navigate('/admin/add-end-reservation', { state: { user } });
        }
    };

    const handleClickPageNumber = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCloseNotification = (userId) => {
        setNotifications(prevNotifications => {
            const newNotifications = { ...prevNotifications };
            delete newNotifications[userId];
            localStorage.setItem('notifications', JSON.stringify(newNotifications));
            return newNotifications;
        });
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const formatRemainingTime = (milliseconds) => {
        if (milliseconds <= 0) return 'N/A';

        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const notificationCount = Object.keys(notifications).length;

    return (
        <div className="conn">
            <h2 className="table-title">Ongoing Reservation</h2>

            <button onClick={toggleNotifications} className="notification-button">
                🔔
                <span className="notification-count">
                    {notificationCount > 0 ? notificationCount : '0'}
                </span>
            </button>

            {showNotifications && notificationCount > 0 && (
                <div className="notification-dropdown">
                    {Object.entries(notifications).map(([userId, message]) => (
                        <div key={userId} className="notification-item">
                            <p>{message}</p>
                            <button onClick={() => handleCloseNotification(userId)} className="close-button">
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="history-container1">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th className="title">Seat Number</th>
                            <th className="title">Name</th>
                            <th className="title">Internet Hours</th>
                            <th className="title">Start Date</th>
                            <th className="title">Expected End Date</th>
                            <th className="title">Start Time</th>
                            <th className="title">Expected End Time</th>
                            <th className="title">Time Remaining</th>
                            <th className="title">End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user) => (
                                <tr key={user.user_id} className={notifications[user.user_id] ? 'notify' : ''}>
                                    <td className="data">{user.seatNumber || 'N/A'}</td>
                                    <td className="data">{user.name || 'N/A'}</td>
                                    <td className="data">{formatInternetHours(user.internetHours)}</td>
                                    <td className="data">{formatDate(user.startDate)}</td>
                                    <td className="data">
                                        {user.internetHours === '168' || user.internetHours === '720' ? 'N/A' : formatDate(user.expectedEndDate)}
                                    </td>
                                    <td className="data">{formatTime(user.startTime)}</td>
                                    <td className="data">{formatTime(user.expectedEndTime)}</td>
                                    <td className="data">
                                        {timeRemaining[user.user_id] ? formatRemainingTime(timeRemaining[user.user_id]) : 'N/A'}
                                    </td>
                                    <td className="data">
                                    <button
                                            onClick={() => handleEndClick(user)}
                                            className="end-button"
                                        >
                                            End
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No ongoing reservations</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handleClickPageNumber(index + 1)}
                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OngoingReservationTable;
