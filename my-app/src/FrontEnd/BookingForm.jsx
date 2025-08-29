import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../CSS/MyBoookingForm.module.css";
import { createBooking, getFieldById } from "../services/firebaseService";

// toast.configure();

const BookingForm = ({ selectedDate, fieldId, fieldName, location, type, amount }) => {
  const params = useParams();
  const locationHook = useLocation();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [fieldDetails, setFieldDetails] = useState(null);
  const navigate = useNavigate();

  // Resolve date from props or URL query (?date=YYYY-MM-DD)
  useEffect(() => {
    const search = new URLSearchParams(locationHook.search);
    const dateFromQuery = search.get("date");
    const resolvedDate = selectedDate || dateFromQuery || "";
    if (resolvedDate) {
      setDate(resolvedDate);
    }
  }, [selectedDate, locationHook.search]);

  useEffect(() => {
    const loadField = async () => {
      const resolvedFieldId = fieldId || params.id || null;
      if (!resolvedFieldId) return;
      try {
        const field = await getFieldById(resolvedFieldId);
        setFieldDetails(field);
      } catch (err) {
        console.error("Failed to load field details:", err);
      }
    };
    loadField();
  }, [fieldId, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !startTime || !endTime) {
      toast.error("Please fill all fields");
      return;
    }

    const timeSlot = `${startTime} - ${endTime}`;

    try {
      const resolvedFieldId = fieldId || params.id || null;
      await createBooking({
        fieldId: resolvedFieldId,
        fieldName: fieldName || fieldDetails?.name || "",
        location: location || fieldDetails?.location || "",
        type: type || fieldDetails?.type || "",
        date,
        timeSlot,
        paymentStatus: "Pending",
        amount: amount ?? 0,
      });

      toast.success("Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Failed to save booking. Please try again.");
    }
  };

  return (
    <form className={styles.bookingForm} onSubmit={handleSubmit}>
      <h2>Book Turf</h2>

      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label>Start Time:</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />

      <label>End Time:</label>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />

      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;
