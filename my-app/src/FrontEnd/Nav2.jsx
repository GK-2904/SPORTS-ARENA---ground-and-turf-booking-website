import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../CSS/Nav2.module.css';
import SearchBar from './SearchBar';

const Nav2 = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Prevent body scroll when menu is open (mobile)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} ref={navRef}>
        <div className={styles.left}>
          <button
            className={styles.burger}
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
          <NavLink to="/" className={styles.brand} onClick={() => setOpen(false)}>
            <span className={styles.brandText}>Sports Arena</span>
          </NavLink>
        </div>
        <div className={styles.center}>
          <SearchBar />
        </div>
        <div className={`${styles.links} ${open ? styles.open : ''}`}>
          <NavLink className={linkClass} to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink className={linkClass} to="/locations" onClick={() => setOpen(false)}>Locations</NavLink>
          <NavLink className={linkClass} to="/gallery" onClick={() => setOpen(false)}>Gallery</NavLink>
          <NavLink className={linkClass} to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink className={linkClass} to="/my-bookings" onClick={() => setOpen(false)}>My Bookings</NavLink>
          <NavLink className={linkClass} to="/register" onClick={() => setOpen(false)}>Register</NavLink>
          <NavLink className={linkClass} to="/login" onClick={() => setOpen(false)}>Login</NavLink>
          
        </div>
      </nav>
    </header>
  );
};

export default Nav2;
