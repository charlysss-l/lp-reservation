import { useLocation } from 'react-router-dom';

import './DisplayCode.css';

const DisplayCode = () => {
    const location = useLocation();
    const { code } = location.state || { code: '' };

    const imageUrl = code; // Directly use the Firebase Storage URL


    return (
        <div className="display-container">
        <h1 className="display-title">Reservation Successful!</h1>
        
        <div className="button-display-container">
        <p>Your Reservation Code: 

          <br/>
          {code ? (
                    <img src={imageUrl} alt="Reservation Code" className="display-image" />
                ) : (
                    'No Image Available'
                )}</p>

        
        </div>
      </div>
               

    );
};

export default DisplayCode;


