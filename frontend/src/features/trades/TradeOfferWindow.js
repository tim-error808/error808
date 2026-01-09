import React, { useEffect, useState } from "react";
import api from "../../api/api";
import PulseLoader from "react-spinners/PulseLoader";

const TradeOfferWindow = ({ requestedListingId, onClose }) => {
  const [myListings, setMyListings] = useState([]);
  const [selectedListings, setSelectedListings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const res = await api.get("/listings/my?available=true");
        setMyListings(res.data);
      } catch (err) {
        setError("Failed to load your games.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  const toggleListing = (id) => {
    setSelectedListings((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selectedListings.length === 0) {
      setError("You must offer at least one game.");
      return;
    }

    try {
      await api.post("/trades", {
        requestedListings: [requestedListingId],
        offeredListings: selectedListings,
      });

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send offer.");
    }
  };

  if (loading) {
    return <PulseLoader className="loader" color="#0000" />;
  }

  return (
    <div className="game trade-window">
      <h3>Offer Trade</h3>

      <p className="trade-hint">
        Select the games you want to offer in exchange.
      </p>

      <div className="trade-list">
        {myListings.length === 0 && (
          <p className="muted-text">
            You don't have any available games for trade.
          </p>
        )}

        {myListings.map((listing) => (
          <label key={listing._id} className="trade-item">
            <input
              type="checkbox"
              checked={selectedListings.includes(listing._id)}
              onChange={() => toggleListing(listing._id)}
            />
            <span>{listing.name}</span>
          </label>
        ))}
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="trade-actions">
        <button className="secondary-button" onClick={onClose}>
          Cancel
        </button>
        <button className="primary-button" onClick={handleSubmit}>
          Offer
        </button>
      </div>
    </div>
  );
};

export default TradeOfferWindow;
