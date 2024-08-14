

import {Route, Routes} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Home from './Home/Home'
import SeatMap from './SeatMap/SeatMap'
import AddReservation from '../components/AddReservation/AddReservation'
import AddReceipt from '../components/AddReceipt/AddReceipt'
import History from './History/History'
import HistoryTable from '../components/HistoryTable/HistoryTable'
import './Admin.css'
import Login from './Login/Login'
import MaybeShowNavbar from '../components/MaybeShowNavbar/MaybeShowNavbar'

const Admin = () => {
  return (
      <main className="admin-page">
      <MaybeShowNavbar>
        <Navbar/>
      </MaybeShowNavbar>
      
          <Routes>
            <Route path="/" element={<Login />}/> 
              <Route path="/home" element={<Home />}/>
              <Route path="/admin/seat-map" element={<SeatMap />}/>
              <Route path="/admin/add-reservation" element={<AddReservation />}/>
              <Route path="/admin/add-receipt" element={<AddReceipt />}/>
              <Route path="/admin/history" element={<History />}/>
              <Route path="/admin/history-table" element={<HistoryTable />}/>
          </Routes>
      </main>


    
  )
}

export default Admin

