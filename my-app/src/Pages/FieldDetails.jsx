import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFieldById } from "../services/firebaseService";

const FieldDetails = () => {
  const { id } = useParams();
  const [field, setField] = useState(null);

  useEffect(() => {
    const fetchField = async () => {
      try {
        const fieldData = await getFieldById(id);
        setField(fieldData);
      } catch (error) {
        console.error('Error fetching field:', error);
      }
    };
    fetchField();
  }, [id]);

  if (!field) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>{field.name}</h2>
      <p><strong>Location:</strong> {field.location}</p>
      <p><strong>Type:</strong> {field.type}</p>
      <p><strong>Status:</strong> {field.status}</p>
      <p><strong>Slots:</strong> {field.slots.join(", ")}</p>

      <h3>Facilities</h3>
      <ul>
        {field.facilities.map((f, i) => <li key={i}>{f}</li>)}
      </ul>

      <h3>Images</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {field.images.map((img, i) => (
          <img key={i} src={img} alt="Cricket field" width="200" style={{ borderRadius: "10px" }} />
        ))}
      </div>

      <Link to='/'> <button> back to home </button></Link>
    </div>
  );
};

export default FieldDetails;
