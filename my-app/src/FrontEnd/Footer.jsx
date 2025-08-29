import styles from "../CSS/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.section}>
          <h3>About TurfBook</h3>
          <p>
            TurfBook is your one-stop platform for booking football turfs,
            cricket grounds, badminton courts, and more across Maharashtra.
            Easy, fast, and reliable.
          </p>
        </div>

        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/bookings">Book a Turf</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Popular Cities</h3>
          <ul>
            <li>Mumbai</li>
            <li>Pune</li>
            <li>Nagpur</li>
            <li>Solapur</li>
            <li>Aurangabad</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Contact</h3>
          <p>📞 +91 9326162524</p>
          <p>✉ support@turfbook.com</p>
          <p>📍 Solapur, Maharashtra</p>

          <div className={styles.social}>
            <a href="#">FACEBOOK</a>
            <a href="#">INSTAGRAM</a>
            <a href="#">X</a>
            <a href="#">LINKED IN</a>
          </div>
        </div>
      </div>

      <div className={styles.newsletter}>
        <p>Subscribe to our newsletter for latest offers</p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className={styles.bottom}>
        © 2025 TurfBook. All Rights Reserved.
      </div>
    </footer>
  );
}









