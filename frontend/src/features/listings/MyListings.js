import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import ModeConfig from "../../config/ModeConfig";

const MyListings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { apiUri } = ModeConfig();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitDone, setSubmitDone] = useState(false);
  const [message, setMessage] = useState("");
  const canPost = !!user?.location?.city;

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const response = await api.get("/listings/my");
        setListings(response.data);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  const onEditClicked = (listingId) => {
    navigate(`/listings/edit/${listingId}`, { replace: false });
  };

  const onDeleteClicked = async (listingId) => {
    try {
      await api.delete(`/listings/remove/${listingId}`);
      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      setMessage("Listing deleted successfully.");
      setSubmitDone(true);
    } catch (error) {
      setError(error.response?.data?.message);
      setSubmitDone(true);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <PulseLoader color="black" />
      </div>
    );
  }

  return (
    <>
      {submitDone && (
        <div className="auth-done-popup">
          <h1 className="auth-done-text">{error ? error : message}</h1>
          <button
            className="auth-done-btn"
            onClick={() => {
              setSubmitDone(false);
              if (error) return;
            }}
          >
            OK
          </button>
        </div>
      )}
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

        {listings.length === 0 && !error && (
          <div className="info-message offers">
            You haven’t posted any games yet.
          </div>
        )}

        <div className="my-games-list">
          {listings.map((listing) => (
            <section key={listing._id} className="game-card">
              <Link to={`/listings/details/${listing._id}`}>
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
                  <p>Location: {user?.location?.city}</p>
                </div>
              </Link>
              <div className="my-game-actions">
                <button
                  className="my-game-edit-btn"
                  onClick={() => onEditClicked(listing._id)}
                >
                  Edit Listing
                </button>
                <button
                  className="secondary-button"
                  onClick={() => onDeleteClicked(listing._id)}
                >
                  Delete Listing
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyListings;
