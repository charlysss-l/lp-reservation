

import {Route, Routes} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Home from './Home/Home'
import Reservation from './Reservation/Reservation'
import Calendar from '../pages/Calendar/Calendar'
import AddReservation from '../components/AddReservation/AddReservation'
import AddReceipt from '../components/AddReceipt/AddReceipt'

import './Admin.css'

const Admin = () => {
  return (
<main className="admin-page">
<Navbar/>
     <Routes>
     <Route path="/" element={<Home />}/>
        <Route path="/admin/reservation" element={<Reservation />}/>
        <Route path="/admin/calendar" element={<Calendar />}/>
        <Route path="/admin/add-reservation" element={<AddReservation />}/>
        <Route path="/admin/add-receipt" element={<AddReceipt />}/>
     </Routes>
</main>

    
  )
}

export default Admin

