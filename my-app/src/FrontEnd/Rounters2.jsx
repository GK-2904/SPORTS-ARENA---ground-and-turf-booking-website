import React from 'react'
import TurfDetails from './TurfDetails'
import Home from './Home'
import Locations from './Locations'
import Gallery from './Gallery'
import About2 from './About2'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav2 from './Nav2'
import BookingForm from './BookingForm'
import MyBookings from './MyBookings'
import Login from './Login'
import Register from './Register'
import Footer from './Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Rounters2 = () => {

  return (

   <BrowserRouter>
      <Nav2/>

        <ToastContainer
        position="top-center"
        width="400px"
        autoClose={3000}  // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
      
        <Route path="/" element={<Home/>} />
        <Route path="/details/:id" element={<TurfDetails/>} />
        <Route path="/locations" element={<Locations/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/about" element={<About2/>} />
        <Route path="/booking/:id" element={<BookingForm/>} />
        <Route path="/my-bookings" element={<MyBookings/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route path="/booking" element={<TurfBookingPage/>} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>


  )
}

export default Rounters2