import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/SearchBar.module.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status && status !== "All") params.set("status", status);
    if (type && type !== "All") params.set("type", type);
    const query = params.toString();
    navigate(`/?${query}#explore`);
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label>Location</label>
        <input
          type="text"
          placeholder="Search city or turf"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Available</option>
          <option>Booked</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>All</option>
          <option>Turf</option>
          <option>Matting</option>
          <option>Ground</option>
        </select>
      </div>

      <button type="submit" className={styles.searchBtn}>Search</button>
    </form>
  );
};

export default SearchBar;











