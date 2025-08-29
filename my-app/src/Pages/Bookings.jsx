import { useEffect, useState } from "react";
import { getFields, updateField } from "../services/firebaseService";

const Booking = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fieldsData = await getFields();
        setFields(fieldsData);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    fetchFields();
  }, []);

  // ✅ Handle booking (update status to Booked)
  const handleBooking = async (id) => {
    try {
      await updateField(id, { status: "Booked" });
      alert("✅ Turf booked successfully!");
      setFields(fields.map(f => f.id === id ? { ...f, status: "Booked" } : f));
    } catch (error) {
      console.error('Error booking field:', error);
      alert('Failed to book field. Please try again.');
    }
  };

  return (
    <div>
      <h2>🏏 Book a Cricket Field</h2>

      {fields.filter(f => f.status === "Available").length === 0 ? (
        <p>All fields are currently booked.</p>
      ) : (
        fields.filter(f => f.status === "Available").map(field => (
          <div key={field.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h3>{field.name}</h3>
            <p><strong>Location:</strong> {field.location}</p>
            <p><strong>Type:</strong> {field.type}</p>
            <p><strong>Facilities:</strong> {field.facilities.join(", ")}</p>
            <button onClick={() => handleBooking(field.id)}>Book Now</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Booking;
