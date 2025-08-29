import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import CreateField from './CreateField'
import FieldDetails from './FieldDetails'
import EditField from './EditField'
import Fields from './Fields'
import Booking from './Bookings'

const Routers = () => {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        {/* Specific routes first */}
        <Route path='/' element={<Home/>} />
        <Route path='/fields' element={<Fields/>} />
        <Route path='/createfield' element={<CreateField/>} />
        <Route path='/edit/:id' element={<EditField/>} />
        <Route path='/booking' element={<Booking/>} />
        
        {/* Dynamic route last */}
        <Route path='/:id' element={<FieldDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers