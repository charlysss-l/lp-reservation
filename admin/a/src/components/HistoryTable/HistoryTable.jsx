import './HistoryTable.css';
import { NavLink } from 'react-router-dom';

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
                            <th className="title">Code</th>
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
                                <td className="data">{users.seatNumber}</td> {/* Fixed property name */}
                                <td className="data">{users.internetHours}</td> {/* Fixed property name */}
                                <td className="data">{users.code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
