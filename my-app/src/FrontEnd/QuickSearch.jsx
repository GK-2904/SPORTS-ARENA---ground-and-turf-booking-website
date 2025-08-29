import { useState } from "react";
import styles from "../CSS/QuickSearch.module.css";

const QuickSearch = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({
    q: "",
    status: "All",
    type: "All"
  });

  const quickFilters = [
    { label: "🏏 Turf", type: "type", value: "Turf" },
    { label: "🏟️ Ground", type: "type", value: "Ground" },
    { label: "💡 Flood Lights", type: "facility", value: "Flood Lights" },
    { label: "🚗 Parking", type: "facility", value: "Parking" },
    { label: "📍 Mumbai", type: "location", value: "Mumbai" },
    { label: "📍 Pune", type: "location", value: "Pune" }
  ];

  const handleFilterClick = (filter) => {
    let newFilters = { ...activeFilters };
    
    if (filter.type === "type") {
      newFilters.type = newFilters.type === filter.value ? "All" : filter.value;
    } else if (filter.type === "facility") {
      // Handle facility filters
      newFilters.q = filter.value;
    } else if (filter.type === "location") {
      newFilters.q = filter.value;
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Quick Search</h3>
      <div className={styles.chips}>
        {quickFilters.map((filter, index) => (
          <button
            key={index}
            className={`${styles.chip} ${
              (filter.type === "type" && activeFilters.type === filter.value) ||
              (filter.type === "facility" && activeFilters.q === filter.value) ||
              (filter.type === "location" && activeFilters.q === filter.value)
                ? styles.active
                : ""
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSearch;









