import { useLocation } from 'react-router-dom';
import './DisplayCode.css';

const DisplayCode = () => {
    const location = useLocation();
    const { code } = location.state || { code: '' };
    const apiUrl = import.meta.env.VITE_API_URL;
    const imageUrl = `${apiUrl}/Images/${code}`;

    return (
        <div className="display-container">
            <h1 className="display-title">Reservation Successful!</h1>
            <div className="button-display-container">
                <p>Your Voucher Code:<br />
                    {code ? (
                        <img src={imageUrl} alt="Reservation Code" className="display-image" />
                    ) : (
                        'No Image Available'
                    )}
                </p>
            </div>
        </div>
    );
};

export default DisplayCode;
