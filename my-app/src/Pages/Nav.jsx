import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo5.png'

const Nav = () => {
  return (
    <nav style={{
      background: '#333',
      padding: '15px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <NavLink to='/' style={{ marginRight: '16px' }}>
        <img src={logo} alt='Sports Arena' style={{ height: '36px' }} />
      </NavLink>
      <NavLink 
        to='/' 
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#ccc',
          textDecoration: 'none',
          marginRight: '20px',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        🏠 Home
      </NavLink>
      
      <NavLink 
        to='/fields' 
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#ccc',
          textDecoration: 'none',
          marginRight: '20px',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        🏏 Fields
      </NavLink>
      
      <NavLink 
        to='/createfield' 
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#ccc',
          textDecoration: 'none',
          marginRight: '20px',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        ➕ Create Field
      </NavLink>
      
      <NavLink 
        to='/booking' 
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#ccc',
          textDecoration: 'none',
          marginRight: '20px',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        📅 Bookings
      </NavLink>
    </nav>
  )
}

export default Nav