import { useEffect, useState } from "react";
import { getFields, deleteField } from "../services/firebaseService";
import { Link } from "react-router-dom";
import styles from "../CSS/Fields.module.css";

const Fields = () => {
  const [fields, setFields] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

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

  const handleDelete = async (id) => {
    try {
      await deleteField(id);
      setFields(fields.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error deleting field:', error);
      alert('Failed to delete field. Please try again.');
    }
  };

  // 🔍 Search + Filter logic
  const filteredFields = fields.filter(field => {
    const matchesSearch =
      field.name.toLowerCase().includes(search.toLowerCase()) ||
      field.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || field.status === statusFilter;

    const matchesType =
      typeFilter === "All" || field.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

return (
  <div className={styles.container}>
    <h2 className={styles.title}>🏟️ Cricket Fields</h2>

    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Search by name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
      />
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.select}>
        <option value="All">All Status</option>
        <option value="Available">Available</option>
        <option value="Booked">Booked</option>
      </select>
      <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={styles.select}>
        <option value="All">All Types</option>
        <option value="Turf">Turf</option>
        <option value="Matting">Matting</option>
        <option value="Ground">Ground</option>
      </select>
      <Link to='/createfield' className={styles.button}>Add Field</Link>
    </div>

    <div>
      {filteredFields.length > 0 ? (
        filteredFields.map(field => (
          <div key={field.id} className={styles.card}>
            <h3>{field.name}</h3>
            <p><strong>Location:</strong> {field.location}</p>
            <p><strong>Type:</strong> {field.type}</p>
            <p><strong>Status:</strong> {field.status}</p>
            <Link to={`/${field.id}`}>View Details</Link>
            <Link to={`/edit/${field.id}`}>Edit</Link>
            <button onClick={() => handleDelete(field.id)} className={styles.button}>Delete</button>
          </div>
        ))
      ) : (
        <p>No fields match your search/filter.</p>
      )}
    </div>
  </div>
);
};

export default Fields;
