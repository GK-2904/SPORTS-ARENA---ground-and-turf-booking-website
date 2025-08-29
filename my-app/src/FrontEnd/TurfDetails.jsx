import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFieldById, getBookingsByFieldId } from "../services/firebaseService";
import TurfCalendar from "./TurfCalendar";
import styles from "../CSS/TurfDetails.module.css";

const TurfDetails = () => {
  const { id } = useParams();
  const [field, setField] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fieldData, bookingsData] = await Promise.all([
          getFieldById(id),
          getBookingsByFieldId(id),
        ]);
        setField(fieldData);
        setBookings(bookingsData);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (!field) return <p>Loading...</p>;

  const handleBooking = (date) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login to book this turf!");
      navigate("/login");
    } else {
      navigate(`/booking/${id}?date=${date}`);
    }
  };

 

  return (
    <div className={styles.page}>
      <div className={styles.details}>
        <h2 className={styles.heading}>{field.name}</h2>
        <p><b>📍 Location:</b> {field.location}</p>
        <p><b>🏏 Type:</b> {field.type}</p>
        <p><b>Status:</b> {bookings.length > 0 ? "Partially Booked" : "Available"}</p>

        

        <h3>✅ Facilities</h3>
        <ul className={styles.facilities}>
          {field.facilities.map((f, i) => <li key={i}>{f}</li>)}
        </ul>

        <h3>🖼️ Images</h3>
        <div className={styles.images}>
          {field.images.map((img, i) => <img key={i} src={img} alt="turf" />)}
        </div>

        <h3>⏰ Live Availability Calendar</h3>
        <TurfCalendar fieldId={id} onSlotClick={handleBooking} />

        
      </div>
    </div>
  );
};

export default TurfDetails;
