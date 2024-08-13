
import {NavLink} from 'react-router-dom'
import './Home.css'
const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to our Reservation System</h1>
      
      <div className="button">
        <button className="link-to-reserve-form">
        <NavLink to={'/admin/add-reservation'} className="home-reserve">Reserve a Seat</NavLink>
        </button>

      <NavLink to={'/admin/reservation'} className="home-availability">Check Availability</NavLink>
      </div>
    </div>
  )
}

export default Home