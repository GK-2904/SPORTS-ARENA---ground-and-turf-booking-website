import React from "react";

const Ratings = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "2px", margin: "4px 0" }}>
      {[...Array(fullStars)].map((_, i) => <span key={i}>⭐</span>)}
      {halfStar && <span>✰</span>}
      {[...Array(emptyStars)].map((_, i) => <span key={i}>☆</span>)}
    </div>
  );
};

export default Ratings;
