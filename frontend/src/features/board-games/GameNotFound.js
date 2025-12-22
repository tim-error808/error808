import React from "react";
import api from "../../api/api";
import { useAuth } from "../../hooks/AuthProvider";
import { useState } from "react";

const GameNotFound = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [gameName, setGameName] = useState("");
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");

  const onSavePressed = async () => {
    try {
      setLoading(true);

      await api.post("/wishlist", gameName);

      setSuccess(true);
      setPopup(false);
    } catch (error) {
      console.log(error.response.data.message || error.message);
      setPopup(false);
      setError(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const onAddWishlistPressed = () => {
    setPopup(true);
  };

  if (!isAuthenticated) {
    return (
      <section className="game-not-found">
        <p>This game is currently unavailable. &#128542;</p>
      </section>
    );
  }

  return (
    <section className="game-not-found">
      {popup && (
        <div className="modal-overlay-game-not-found">
          <div className="modal-container-game-not-found">
            <div className="modal-header">
              <h3>Add game to wishlist</h3>
              <button className="modal-close" onClick={() => setPopup(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <label htmlFor="wishlist_game_name">
                Please enter full game name:
              </label>
              <input
                id="wishlist_game_name"
                type="text"
                placeholder="e.g. Catan: Cities & Knights"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                className="modal-button secondary"
                onClick={() => setPopup(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="modal-button primary"
                onClick={onSavePressed}
                disabled={loading || !gameName.trim()}
              >
                {loading ? "Adding..." : "Add to wishlist"}
              </button>
            </div>
          </div>
        </div>
      )}
      <p>This game is currently unavailable. &#128542;</p>
      <button
        type="button"
        className="game-not-found-button"
        onClick={onAddWishlistPressed}
        disabled={loading}
      >
        Add To Wishlist
      </button>
      {success && (
        <span className="wishlist-success">Added to your wishlist!</span>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </section>
  );
};

export default GameNotFound;
