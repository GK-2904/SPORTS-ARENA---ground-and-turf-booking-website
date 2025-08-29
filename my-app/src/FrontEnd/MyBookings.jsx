import React, { useEffect, useState } from "react";
import { getBookings } from "../services/firebaseService";
import styles from "../CSS/MyBookings.module.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookings();
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  if (bookings.length === 0) {
    return <p className={styles.empty}>No turfs or grounds booked yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🏏 My Booked Turfs & Grounds</h2>
      <div className={styles.bookingsGrid}>
        {bookings.map((b) => (
          <div key={b.id} className={styles.card}>
            <h3>{b.fieldName}</h3>
            <p><b>Location:</b> {b.location}</p>
            <p><b>Type:</b> {b.type}</p>
            <p><b>Date:</b> {b.date}</p>
            <p><b>Time Slot:</b> {b.timeSlot}</p>
            <p className={b.paymentStatus === "Paid" ? styles.paid : styles.pending}>
              <b>Payment Status:</b> {b.paymentStatus}
            </p>
            <p><b>Amount Paid:</b> ₹{b.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
