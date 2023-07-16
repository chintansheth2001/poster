import React from "react";

function Card({ item }) {
  return (
    <div className="card">
      <img
        src={`${import.meta.env.VITE_API_URL}/images/${item["poster-image"]}`}
        alt={item.name}
        onError={(event) =>
          (event.target.src = `${
            import.meta.env.VITE_API_URL
          }/images/placeholder_for_missing_posters.png`)
        }
      />
      <div className="card_name">{item.name}</div>
    </div>
  );
}

export default Card;
