import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/FeaturedCarousel.module.css";

const FeaturedCarousel = ({ title, fields }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!fields || fields.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.controls}>
          <button onClick={() => scroll('left')} className={styles.scrollBtn}>‹</button>
          <button onClick={() => scroll('right')} className={styles.scrollBtn}>›</button>
        </div>
      </div>
      
      <div className={styles.carousel} ref={scrollRef}>
        {fields.map((field) => (
          <div key={field.id} className={styles.card} onClick={() => navigate(`/details/${field.id}`)}>
            <img src={field.images[0]} alt={field.name} className={styles.image} />
            <div className={styles.content}>
              <h4 className={styles.name}>{field.name}</h4>
              <p className={styles.location}>{field.location}</p>
              <div className={styles.rating}>
                {'⭐'.repeat(Math.floor(field.rating || 4))} {field.rating || 4.0}
              </div>
              <span className={styles.type}>{field.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;









