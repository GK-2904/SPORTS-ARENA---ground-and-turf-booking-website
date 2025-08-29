import React, { useState } from "react";
import TurfCalendar from "../FrontEnd/TurfCalendar"; 
import BookingForm from "../FrontEnd/BookingForm";

const TurfBookingPage = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Turf Booking</h1>
      
      {/* Calendar */}
      <TurfCalendar fieldId="field123" onSlotClick={setSelectedDate} />

      {/* Booking form shows only when a date is selected */}
      {selectedDate && <BookingForm selectedDate={selectedDate} fieldId="field123" />}
    </div>
  );
};

export default TurfBookingPage;
