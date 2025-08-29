import { useState } from "react";
import { createField } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/CreateFields.module.css";

const CreateField = () => {
  const [field, setField] = useState({
    name: "",
    location: "",
    type: "Turf",
    slots: "",
    status: "Available",
    facilities: "",
    images: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newField = { 
      ...field, 
      slots: field.slots.split(",").map(s => s.trim()),
      facilities: field.facilities.split(",").map(f => f.trim()),
      images: field.images.split(",").map(img => img.trim())
    };
    try {
      await createField(newField);
      navigate("/");
    } catch (error) {
      console.error('Error creating field:', error);
      alert('Failed to create field. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Cricket Field</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="name" placeholder="Field Name" onChange={handleChange} required className={styles.input} />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required className={styles.input} />
        <select name="type" onChange={handleChange} className={styles.select}>
          <option value="Turf">Turf</option>
          <option value="Matting">Matting</option>
          <option value="Ground">Ground</option>
        </select>
        <input type="text" name="slots" placeholder="Slots (comma separated)" onChange={handleChange} className={styles.input} />
        <select name="status" onChange={handleChange} className={styles.select}>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>
        <input type="text" name="facilities" placeholder="Facilities (comma separated)" onChange={handleChange} className={styles.input} />
        <input type="text" name="images" placeholder="Image URLs (comma separated)" onChange={handleChange} className={styles.input} />
        <button type="submit" className={styles.button}>Add Field</button>
      </form>
    </div>
  );
};

export default CreateField;
