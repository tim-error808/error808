import React, { useEffect, useState } from "react";
import api from "../../api/api";
import PulseLoader from "react-spinners/PulseLoader";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/wishlist").then((res) => {
      setWishlist(res.data);
      setLoading(false);
    });
  }, []);

  const removeFromWishlist = async (gameId) => {
    await api.delete(`/wishlist/${gameId}`);
    setWishlist((prev) => prev.filter((g) => g.id !== gameId));
  };

  if (loading)
    return (
      <div className="loader">
        <PulseLoader color="#0000" />
      </div>
    );

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <h2>My Wishlist</h2>
        <p>Games you are looking for</p>
      </header>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is empty</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((game) => (
            <div className="wishlist-card" key={game.id}>
              <img
                src={game.imageUrl}
                alt={game.name}
                className="wishlist-image"
              />

              <div className="wishlist-info">
                <h4>{game.name}</h4>

                <span
                  className={`wishlist-status ${
                    game.available ? "available" : "unavailable"
                  }`}
                >
                  {game.available ? "Available" : "Not available"}
                </span>
              </div>

              <button
                className="wishlist-remove"
                onClick={() => removeFromWishlist(game.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
