import { useLocation } from 'react-router-dom';
import './DisplayCode.css';

const DisplayCode = () => {
    const location = useLocation();
    const { code } = location.state || { code: '' };

    return (
        <div className="success-container">
            <h2>Reservation Successful</h2>
            <div className="code-display">
                <p>Your Reservation Code: {code}</p>
            </div>
        </div>
    );
};

export default DisplayCode;
