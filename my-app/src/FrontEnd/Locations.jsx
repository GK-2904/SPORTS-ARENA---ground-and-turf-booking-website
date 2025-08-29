import { useEffect, useState } from "react";
import { getFields } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/Locations.module.css";

const Locations = () => {
  const [fields, setFields] = useState([]);
  const [city, setCity] = useState("");
  const navigate = useNavigate();

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

  const filtered = city ? fields.filter(f => f.location.toLowerCase().includes(city.toLowerCase())) : fields;

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Filter by Location</h2>
      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        className={styles.searchBox}
      />
      <div className={styles.grid}>
        {filtered.map(f => (
          <div key={f.id} className={styles.card}>
            <img src={f.images[0]} alt={f.name} className={styles.turfImage} />
            <div className={styles.turfInfo}>
              <h3 className={styles.turfName}>{f.name}</h3>
              <p className={styles.location}> {f.location}</p>

              <div className={styles.mapWrapper}>
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(f.location)}&output=embed`}
        loading="lazy"
        allowFullScreen
        className={styles.map}
        title={`map-${f.id}`}
      ></iframe>
    </div>
              <p className={`${styles.status} ${f.status === "Booked" ? styles.statusBooked : styles.statusAvailable}`}>
                {f.status}
              </p>
              <button 
                className={`${styles.button} ${styles.detailsButton}`} 
                onClick={() => navigate(`/details/${f.id}`)}
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
