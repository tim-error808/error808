import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import ModeConfig from "../../config/ModeConfig";
import TradeOfferWindow from "../trades/TradeOfferWindow";
import ReadOnlyMap from "../../components/ReadOnlyMap";
import { useAuth } from "../../hooks/AuthProvider";
import api from "../../api/api";

const Listing = () => {
  const { apiUri } = ModeConfig();
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTradeModal, setShowTradeModal] = useState(false);

  useEffect(() => {
    api
      .get(`/listings/details/${listingId}`)
      .then((res) => {
        setListing(res.data);
        setError("");
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [listingId, apiUri]);

  if (isLoading) {
    return <PulseLoader className="loader" color="#0000" />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!listing) return <div>Listing not found</div>;

  const handleOfferClick = () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    setShowTradeModal(true);
  };

  return (
    <section className="listing-page">
      <h2 className="listing-title">{listing.name}</h2>

      <div className="listing-main">
        <div className="listing-image">
          {listing.imageUrl ? (
            <img
              src={`${apiUri}${listing.imageUrl}`}
              alt={listing.name}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">No image</div>
          )}
        </div>

        <div className="listing-info">
          <div className="listing-details">
            <span>
              <strong>Genre:</strong> {listing.genre}
            </span>
            <span>
              <strong>Publisher:</strong> {listing.publisher} (
              {listing.releaseYear})
            </span>
            <span>
              <strong>Players:</strong>{" "}
              {listing.minPlayers === listing.maxPlayers
                ? listing.minPlayers
                : `${listing.minPlayers}–${listing.maxPlayers}`}
            </span>
            <span>
              <strong>Play time:</strong> {listing.playTime} min
            </span>
            <span>
              <strong>Difficulty:</strong> {listing.difficulty}/5
            </span>
            <span>
              <strong>Condition:</strong> {listing.condition}
            </span>
          </div>

          <button
            className="primary-button offer-button"
            onClick={handleOfferClick}
          >
            Offer Exchange
          </button>
        </div>
      </div>

      <div className="listing-description">
        <h3>Description</h3>
        {listing.description && <span>{listing.description}</span>}
      </div>

      {listing.user?.location && (
        <div className="owner-map-layout">
          <div className="owner-details">
            <div className="owner-avatar">
              {listing.user.profile.photoUrl ? (
                <img
                  src={
                    listing.user.googleId
                      ? listing.user.profile.photoUrl
                      : `${apiUri}${listing.user.profile.photoUrl}`
                  }
                  alt={listing.user.username}
                  loading="lazy"
                />
              ) : (
                <img src="/default-avatar.png" alt="default-avatar" />
              )}
            </div>

            <div className="owner-details-info">
              <span>
                <strong>Name:</strong> {listing.user.username}
              </span>
              <span>
                <strong>Contact:</strong> {listing.user.email}
              </span>
              <span>
                <strong>City:</strong> {listing.user.location.city}
              </span>
            </div>
          </div>

          <div className="listing-map">
            <ReadOnlyMap
              latitude={listing.user.location.latitude}
              longitude={listing.user.location.longitude}
            />
          </div>
        </div>
      )}

      {showTradeModal && (
        <div className="modal-overlay">
          <TradeOfferWindow
            requestedListing={listing}
            onClose={() => setShowTradeModal(false)}
            isCounterOffer={false}
          />
        </div>
      )}
    </section>
  );
};

export default Listing;
