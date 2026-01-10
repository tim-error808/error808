import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import ModeConfig from "../../config/ModeConfig";
import TradeOfferWindow from "../trades/TradeOfferWindow";
import ReadOnlyMap from "../../components/ReadOnlyMap";
import { useAuth } from "../../hooks/AuthProvider";

const Listing = () => {
  const { apiUri } = ModeConfig();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTradeModal, setShowTradeModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUri}/listings/${id}`)
      .then((res) => {
        setListing(res.data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id, apiUri]);

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
    <section className="game">
      <h2 className="game-title">{listing.name}</h2>

      <div className="game-details">
        <span className="genre">{listing.genre}</span>
        <span className="publisher">
          {listing.publisher} ({listing.releaseYear})
        </span>
        <span className="players">
          Number Of Players: {listing.minPlayers}-{listing.maxPlayers}
        </span>
        <span className="playtime">Play Time: {listing.playTime} min</span>
        <span className="difficulty">Difficulty: {listing.difficulty}/5</span>
        <span className="condition">Condition {listing.condition}/10</span>
      </div>

      {listing.description && (
        <p className="description">{listing.description}</p>
      )}

      {listing.userId?.location && (
        <div className="listing-location">
          <h4>Owners Location</h4>
          <div className="map-preview">
            <ReadOnlyMap
              latitude={listing.user.location.latitude}
              longitude={listing.user.location.longitude}
            />
          </div>
        </div>
      )}

      <button className="game-card-button" onClick={handleOfferClick}>
        Offer Exchange
      </button>

      {showTradeModal && (
        <div className="modal-overlay">
          <TradeOfferWindow
            requestedListingId={listing._id}
            onClose={() => setShowTradeModal(false)}
          />
        </div>
      )}
    </section>
  );
};

export default Listing;
