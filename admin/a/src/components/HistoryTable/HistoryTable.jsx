import './HistoryTable.css';

const HistoryTable = () => {
    return (
        <div className="conn">
            <div className="history-heading">
                    <h3>Reservation History</h3>
                </div>
            <div className="history-container">

                <table className="history-table">
                    <thead>
                        <tr>
                            <th className="title">UserID</th>
                            <th className="title">Name</th>
                            <th className="title">Email</th>
                            <th className="title">Contact Number</th>
                            <th className="title">Company</th>
                            <th className="title">Start Date</th>
                            <th className="title">Start Time</th>
                            <th className="title">End Date</th>
                            <th className="title">Total Time</th>
                            <th className="title">Seat Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="data">001</td>
                            <td className="data">Liz</td>
                            <td className="data">liz@gmail.com</td>
                            <td className="data">0999999</td>
                            <td className="data">Suites</td>
                            <td className="data">August 13, 2024</td>
                            <td className="data">4:43pm</td>
                            <td className="data">August 13, 2024</td>
                            <td className="data">8 hrs</td>
                            <td className="data">A1</td>
                        </tr>
                        
                        <tr>
                            <td className="data">002</td>
                            <td className="data">Ella</td>
                            <td className="data">ella@gmail.com</td>
                            <td className="data">0999999</td>
                            <td className="data">Suites</td>
                            <td className="data">August 13, 2024</td>
                            <td className="data">4:43pm</td>
                            <td className="data">August 13, 2024</td>
                            <td className="data">8 hrs</td>
                            <td className="data">A1</td>
                        </tr>
                                                
                        <tr>
                            <td className="data">003</td>
                            <td className="data">Kel</td>
                            <td className="data">kel@gmail.com</td>
                            <td className="data">0999999</td>
                            <td className="data">Suites</td>
                            <td className="data">August 13, 2024</td>
                            <td className="data">4:43pm</td>
                            <td className="data">August 13, 2024</td>
                            <td className="data">8 hrs</td>
                            <td className="data">A1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
