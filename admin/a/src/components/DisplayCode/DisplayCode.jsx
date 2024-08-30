import { useLocation } from 'react-router-dom';

import './DisplayCode.css';

const DisplayCode = () => {
    const location = useLocation();
    const { code } = location.state || { code: '' };

    const imageUrl = `http://localhost:3000/Images/${code}`; // Construct the URL based on the code


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


