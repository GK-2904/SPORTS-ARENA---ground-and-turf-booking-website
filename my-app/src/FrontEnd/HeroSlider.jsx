import { useEffect, useState } from "react";
import styles from "../CSS/HeroSlider.module.css";

const slides = [
  {
    image:
      "https://images.pexels.com/photos/139762/pexels-photo-139762.jpeg",
    title: "Play Under the Lights",
    subtitle: "Premium turfs with flood lights and pro facilities",
  },
  {
    image:
      "https://images.pexels.com/photos/29949985/pexels-photo-29949985.jpeg",
    title: "Book in Seconds",
    subtitle: "Real-time availability and instant confirmation",
  },
  {
    image:
      "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg",
    title: "Train Like a Pro",
    subtitle: "Top-rated grounds across multiple cities",
  },
];

const AUTO_PLAY_MS = 4500;

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.hero}>
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`${styles.slide} ${idx === activeIndex ? styles.active : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <a href="#explore" className={styles.ctaPrimary}>Explore Turfs</a>
          </div>
        </div>
      ))}

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;








