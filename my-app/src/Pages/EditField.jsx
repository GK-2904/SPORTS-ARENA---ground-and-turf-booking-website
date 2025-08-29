import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFieldById, updateField } from "../services/firebaseService";
import styles from "../CSS/EditField.module.css";


const EditField = () => {
  const { id } = useParams();
  const [field, setField] = useState({ name: "", location: "", type: "Turf", slots: "", status: "Available", facilities: "", images: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchField = async () => {
      try {
        const fieldData = await getFieldById(id);
        setField({
          ...fieldData,
          slots: fieldData.slots.join(","),
          facilities: fieldData.facilities.join(","),
          images: fieldData.images.join(",")
        });
      } catch (error) {
        console.error('Error fetching field:', error);
      }
    };
    fetchField();
  }, [id]);

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedField = { 
      ...field, 
      slots: field.slots.split(",").map(s => s.trim()),
      facilities: field.facilities.split(",").map(f => f.trim()),
      images: field.images.split(",").map(img => img.trim())
    };
    try {
      await updateField(id, updatedField);
      navigate("/");
    } catch (error) {
      console.error('Error updating field:', error);
      alert('Failed to update field. Please try again.');
    }
  };

 return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Cricket Field</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Field Name</label>
        <input type="text" name="name" value={field.name} onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Location</label>
        <input type="text" name="location" value={field.location} onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Type</label>
        <select name="type" value={field.type} onChange={handleChange} className={styles.select}>
          <option value="Turf">Turf</option>
          <option value="Matting">Matting</option>
          <option value="Ground">Ground</option>
        </select>

        <label className={styles.label}>Slots (comma separated)</label>
        <input type="text" name="slots" value={field.slots} onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Status</label>
        <select name="status" value={field.status} onChange={handleChange} className={styles.select}>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>

        <label className={styles.label}>Facilities (comma separated)</label>
        <input type="text" name="facilities" value={field.facilities} onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Images (comma separated)</label>
        <input type="text" name="images" value={field.images} onChange={handleChange} className={styles.input} />

        <button type="submit" className={styles.button}>Update Field</button>
      </form>
    </div>
  );
};

export default EditField;
