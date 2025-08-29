import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getBookingsByFieldId } from "../services/firebaseService";
import styles from "../CSS/Calender.module.css";

const TurfCalendar = ({ fieldId, onSlotClick }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getBookingsByFieldId(fieldId);

        // Booked events (red)
        const bookedEvents = bookings.map(b => ({
          title: "Booked",
          start: b.date + "T" + b.startTime,
          end: b.date + "T" + b.endTime,
          color: "#ef4444", // red
        }));

        // Available days (green) — mark full days that are not booked
        const today = new Date();
        const futureDays = Array.from({ length: 30 }, (_, i) => {
          const d = new Date();
          d.setDate(today.getDate() + i);
          return d.toISOString().split("T")[0];
        });

        const bookedDates = [...new Set(bookings.map(b => b.date))];
        const availableEvents = futureDays
          .filter(d => !bookedDates.includes(d))
          .map(d => ({
            title: "Available",
            start: d,
            display: "background",
            color: "#22c55e", // green
          }));

        setEvents([...bookedEvents, ...availableEvents]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookings();
  }, [fieldId]);

  const handleDateClick = (info) => {
  onSlotClick(info.dateStr); // YYYY-MM-DD directly
};
  return (
    <div className={styles.calendarWrapper}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="auto"
      />
    </div>
  );
};

export default TurfCalendar;
