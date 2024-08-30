import { useLocation } from 'react-router-dom';

import './DisplayCode.css';

const DisplayCode = () => {
    const location = useLocation();
    const { code } = location.state || { code: '' };

    return (
        <div className="display-container">
        <h1 className="display-title">Reservation Successful!</h1>
        
        <div className="button-display-container">
        <p>Your Reservation Code: {code}</p>
        </div>
      </div>
               

    );
};

export default DisplayCode;
