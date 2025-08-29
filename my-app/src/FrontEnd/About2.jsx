import styles from "../CSS/About2.module.css";

// Sample icons (can replace with your images or SVGs)
import turfIcon from "../assets/logo2.jpg";
import playerIcon from "../assets/logo3.jpeg";
import adminIcon from "../assets/logo5.png";
import visionIcon from "../assets/logo.webp";
import futureIcon from "../assets/logo11.avif";

const About = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>🏏 About Cricket Turf Booking Platform</h1>

      <div className={styles.section}>
        <div className={styles.iconWrapper}>
          <img src={turfIcon} alt="Turf" className={styles.icon} />
        </div>
        <h2 className={styles.subheading}>Why Choose Our Platform?</h2>
        <p className={styles.text}>
          Our platform brings cricket enthusiasts closer to their favorite sport. You can easily browse turfs, check availability, and book slots online — anytime, anywhere. No more phone calls or waiting!
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.iconWrapper}>
          <img src={playerIcon} alt="Player Features" className={styles.icon} />
        </div>
        <h2 className={styles.subheading}>Features for Players</h2>
        <ul className={styles.list}>
          <li>📅 Check real-time availability of turfs</li>
          <li>🖼️ View turf images and facilities</li>
          <li>⏰ Book preferred time slots instantly</li>
          <li>📍 Find turfs using embedded Google Maps</li>
          <li>💳 Secure online payment options</li>
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.iconWrapper}>
          <img src={adminIcon} alt="Admin Dashboard" className={styles.icon} />
        </div>
        <h2 className={styles.subheading}>Admin Dashboard</h2>
        <ul className={styles.list}>
          <li>📊 Manage turf listings, images, and facilities</li>
          <li>📅 Monitor all bookings in real-time</li>
          <li>✅ Approve or reject bookings instantly</li>
          <li>📈 Generate analytics and reports</li>
          <li>🔒 Secure login and access control</li>
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.iconWrapper}>
          <img src={visionIcon} alt="Vision" className={styles.icon} />
        </div>
        <h2 className={styles.subheading}>Our Vision</h2>
        <p className={styles.text}>
          We aim to make cricket turf booking seamless and accessible to everyone. Our mission is to create a community where players can easily find and book turfs, improving both convenience and engagement in the sport.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.iconWrapper}>
          <img src={futureIcon} alt="Future Plans" className={styles.icon} />
        </div>
        <h2 className={styles.subheading}>Future Plans</h2>
        <p className={styles.text}>
          🌟 Add rating and review system for turfs<br/>
          🌟 Integrate tournaments and leagues management<br/>
          🌟 Provide personalized recommendations based on player preferences<br/>
          🌟 Mobile app for on-the-go booking
        </p>
      </div>

      <div className={styles.highlight}>
        <p>
          Join thousands of cricket enthusiasts today and enjoy hassle-free turf booking! 🏆
        </p>
      </div>
    </div>
  );
};

export default About;
