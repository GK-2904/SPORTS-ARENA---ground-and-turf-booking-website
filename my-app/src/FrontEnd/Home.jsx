import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFields, getBookings } from "../services/firebaseService";
import styles from "../CSS/Home.module.css";
import HeroSlider from "./HeroSlider";
import QuickSearch from "./QuickSearch";
import FeaturedCarousel from "./FeaturedCarousel";
import Testimonials from "./Testimonials";

const Home = () => {
  const [fields, setFields] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fieldsData, bookingsData] = await Promise.all([
          getFields(),
          getBookings()
        ]);
        setFields(fieldsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    const st = params.get('status') || 'All';
    const tp = params.get('type') || 'All';
    setSearch(q);
    setStatusFilter(st);
    setTypeFilter(tp);
  }, [location.search]);
  
  const isBooked = (fieldId) => bookings.some(b => b.fieldId === fieldId);

  const filteredFields = fields.filter(field => {
    const matchesSearch =
      field.name.toLowerCase().includes(search.toLowerCase()) ||
      field.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || (isBooked(field.id) ? "Booked" : "Available") === statusFilter;

    const matchesType =
      typeFilter === "All" || field.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleBooking = (fieldId) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("Please login to book this field!");
      navigate("/login");
    } else {
      navigate(`/booking/${fieldId}`);
      console.log(navigate(`/booking/${fieldId}`));
      
    }
  };

  return (
    <div className={styles.page}>
      <HeroSlider />
      <QuickSearch onFilterChange={(filters) => {
        setSearch(filters.q || "");
        setStatusFilter(filters.status || "All");
        setTypeFilter(filters.type || "All");
      }} />
      
      <div className={styles.sections}>
        <FeaturedCarousel title="🔥 Trending This Week" fields={fields.slice(0, 4)} />
        <FeaturedCarousel title="📍 Near You" fields={fields.slice(4, 8)} />
        <FeaturedCarousel title="⭐ Newly Added" fields={fields.slice(8, 12)} />
      </div>

      <h2 className={styles.heading}>🏏 Cricket Turfs And Grounds </h2>

      {/* -------------------- Updated Turf Cards Section -------------------- */}
      <div className={styles.grid} id="explore">
        {filteredFields.map(field => {
          const fieldBooked = isBooked(field.id);
          

          return (
            <div key={field.id} className={styles.card}>
              <img src={field.images[0]} alt={field.name} className={styles.turfImage} />
              <div className={styles.turfInfo}>
                <h3 className={styles.turfName}>{field.name}</h3>
                <p><b>Location:</b> {field.location}</p>
                <p><b>Type:</b> {field.type}</p>

                

                {/* Status Badge */}
                <span className={`${styles.status} ${fieldBooked ? styles.statusBooked : styles.statusAvailable}`}>
                  {fieldBooked ? "Booked" : "Available"}
                </span>

                <div style={{ marginTop: "10px" }}>
                  <button
                    className={`${styles.button} ${styles.bookNow}`}
                    onClick={() => handleBooking(field.id)}
                    disabled={fieldBooked}
                  >
                    {fieldBooked ? "Already Booked" : "Quick Book"}
                  </button>
                  <button
                    className={`${styles.button} ${styles.moreDetails}`}
                    onClick={() => navigate(`/details/${field.id}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* -------------------- End Updated Turf Cards Section -------------------- */}

    </div>
  );
};

export default Home;
