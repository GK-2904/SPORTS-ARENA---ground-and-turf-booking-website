import styles from "../CSS/Testimonials.module.css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Cricket Coach",
      rating: 5,
      text: "Best turf booking experience! The flood lights are perfect for evening practice sessions.",
      avatar: "🏏"
    },
    {
      name: "Priya Patel",
      role: "Team Captain",
      rating: 5,
      text: "Easy booking, great facilities. Our team loves playing here every weekend!",
      avatar: "⚽"
    },
    {
      name: "Amit Kumar",
      role: "Sports Enthusiast",
      rating: 4,
      text: "Clean grounds and professional service. Highly recommended for cricket lovers.",
      avatar: "🏟️"
    }
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>What Our Users Say</h2>
      <div className={styles.grid}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.avatar}>{testimonial.avatar}</div>
              <div className={styles.info}>
                <h4 className={styles.name}>{testimonial.name}</h4>
                <p className={styles.role}>{testimonial.role}</p>
              </div>
              <div className={styles.rating}>
                {'⭐'.repeat(testimonial.rating)}
              </div>
            </div>
            <p className={styles.text}>{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;









