import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import api from "../../api/api";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const canPost = !!user?.location?.city;

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const response = await api.get("/listings/my");
        setListings(response.data);
      } catch (err) {
        setError("Failed to load your listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <PulseLoader color="#05808c" />
      </div>
    );
  }

  return (
    <div className="my-games-page">
      <div className="my-games-header">
        <h2>My Games</h2>

        {canPost ? (
          <Link to="/listings/new" className="primary-button">
            Post Game
          </Link>
        ) : (
          <div className="info-message">
            Please pick location in your <Link to="/profile">Profile</Link> to
            post games.
          </div>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {listings.length === 0 && !error && (
        <div className="info-message">You haven’t posted any games yet.</div>
      )}

      <div className="my-games-list">
        {listings.map((listing) => (
          <div key={listing._id} className="game-card my-game-card">
            <div className="game-card-img">
              {listing.imageUrl ? (
                <img src={listing.imageUrl} alt={listing.name} loading="lazy" />
              ) : (
                <div className="image-placeholder">No image</div>
              )}
            </div>

            <div className="game-card-details">
              <h3 className="game-title">{listing.name}</h3>

              <div className="game-details">
                <span className="genre">{listing.genre}</span>
                <span className="publisher">{listing.publisher}</span>
                <span className="players">
                  {listing.minPlayers}–{listing.maxPlayers} players
                </span>
                <span className="playtime">{listing.playTime} min</span>
                <span className="difficulty">
                  Difficulty: {listing.difficulty}
                </span>
                <span className="condition">
                  Condition: {listing.condition}
                </span>
              </div>
            </div>

            <div className="my-game-actions">
              <Link
                to={`/listings/edit/${listing._id}`}
                className="secondary-button"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
