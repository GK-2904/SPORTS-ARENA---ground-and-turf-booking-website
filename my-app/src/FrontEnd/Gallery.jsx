import { useEffect, useState } from "react";
import { getFields } from "../services/firebaseService";
import styles from "../CSS/Gallery.module.css";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fieldsData = await getFields();
        const data = fieldsData.flatMap(f => 
          f.images.map(img => ({ name: f.name, image: img }))
        );
        setGallery(data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    fetchFields();
  }, []);

  const openLightbox = (img) => setLightboxImage(img);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>🏞️ Gallery</h2>
      <div className={styles.grid}>
        {gallery.map((item, i) => (
  <div
  key={i}
  className={styles.card}
  onClick={() => openLightbox(item.image)}
  style={{ animationDelay: `${i * 0.05}s` }}
>
  <img src={item.image} alt={item.name} className={styles.image} />
  <div className={styles.overlay}>{item.name}</div>
</div>



        ))}
      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div className={`${styles.lightbox} ${lightboxImage ? "active" : ""}`} onClick={closeLightbox}>
          <img src={lightboxImage} alt="Full View" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
