import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import api from "../../api/api";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import ModeConfig from "../../config/ModeConfig";

const MyListings = () => {
  const { user } = useAuth();
  const { apiUri } = ModeConfig();
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
        <h2>My Listings</h2>

        {canPost ? (
          <Link to="/listings/new" className="primary-button">
            Make New Listing
          </Link>
        ) : (
          <div className="info-message">
            Please pick location in your <Link to="/profile">Profile</Link> to
            make listings.
          </div>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {listings.length === 0 && !error && (
        <div className="info-message">You haven’t posted any games yet.</div>
      )}

      <div className="my-games-list">
        {listings.map((listing) => (
          <section key={listing._id} className="game-card">
            <div className="game-card-img">
              {listing.imageUrl ? (
                <img
                  src={`${apiUri}${listing.imageUrl}`}
                  alt={listing.name}
                  loading="lazy"
                  className="game-image"
                />
              ) : (
                <div className="image-placeholder">No image</div>
              )}
            </div>
            <div className="game-card-details">
              <div className="game-title">{listing.name}</div>
              <p>Difficulty: {listing.difficulty}/5</p>
              <p>
                Players: {listing.minPlayers}-{listing.maxPlayers}
              </p>
              <p>Publisher: {listing.publisher}</p>
              <div className="my-game-actions">
                <button className="my-game-edit-btn">
                  <Link to={`/listings/edit/${listing._id}`}>Edit Listing</Link>
                </button>
                <button className="secondary-button">Delete Listing</button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
