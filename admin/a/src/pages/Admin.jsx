

import {Route, Routes} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Home from './Home/Home'
import Reservation from './Reservation/Reservation'
import AddReservation from '../components/AddReservation/AddReservation'
import AddReceipt from '../components/AddReceipt/AddReceipt'
import ReserveHistory from './ReserveHistory/ReserveHistory'
import './Admin.css'


const Admin = () => {
  return (
<main className="admin-page">
<Navbar/>
     <Routes>
     <Route path="/" element={<Home />}/>
        <Route path="/admin/reservation" element={<Reservation />}/>
        <Route path="/admin/add-reservation" element={<AddReservation />}/>
        <Route path="/admin/add-receipt" element={<AddReceipt />}/>
        <Route path="/admin/reserve-history" element={<ReserveHistory />}/>
     </Routes>
</main>

    
  )
}

export default Admin

