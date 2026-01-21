import React, { useEffect, useState } from "react";
import api from "../../api/api";
import PulseLoader from "react-spinners/PulseLoader";

const TradeOfferWindow = ({
  requestedListing,
  originalOffer = null,
  onClose,
  isCounterOffer,
}) => {
  const [usersListings, setUsersListings] = useState([]);
  const [selectedListings, setSelectedListings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isCounterOffer) {
      const fetchUsersListings = async () => {
        try {
          const res = await api.get(
            `/listings/${originalOffer.initiatorId._id ? originalOffer.initiatorId._id : originalOffer.receiverId._id}`,
          );
          setUsersListings(res.data);
        } catch (error) {
          setError(error.response.data.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUsersListings();
    } else {
      const fetchMyListings = async () => {
        try {
          const res = await api.get("/listings/my");
          setUsersListings(res.data);
        } catch (error) {
          setError(error.response.data.message);
        } finally {
          setLoading(false);
        }
      };

      fetchMyListings();
    }
  }, [
    isCounterOffer,
    originalOffer?.initiatorId?._id,
    originalOffer?.receiverId?._id,
  ]);

  const toggleListing = (id) => {
    setSelectedListings((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    if (selectedListings.length === 0) {
      setError("You must select at least one game.");
      return;
    }

    try {
      let payload = {};

      if (isCounterOffer && originalOffer) {
        payload = {
          offeredListings: originalOffer.requestedListings.map((l) => l._id),
          requestedListings: selectedListings,
          receiverId: originalOffer.initiatorId,
          originalOfferId: originalOffer._id,
        };
      } else {
        payload = {
          requestedListings: requestedListing._id,
          offeredListings: selectedListings,
          receiverId: requestedListing.user._id,
        };
      }

      await api.post("/trades", payload);
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
      <h3>{isCounterOffer ? "Counter Offer" : "Offer Trade"}</h3>

      <p className="trade-hint">
        {isCounterOffer
          ? "Select the games you want for exchange"
          : "Select the games you want to offer"}
      </p>

      <div className="trade-list">
        {usersListings.length === 0 && (
          <p className="muted-text">
            You don't have any available games for trade.
          </p>
        )}

        {usersListings.map((listing) => (
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

      {isCounterOffer && originalOffer && (
        <div className="original-offer-preview">
          <p>
            Games offered by{" "}
            {originalOffer.initiatorId.username
              ? originalOffer.initiatorId.username
              : originalOffer.receiverId.username}
            :
          </p>
          <ul>
            {originalOffer.offeredListings.map((listing) => (
              <li key={listing._id}>{listing.name}</li>
            ))}
          </ul>
        </div>
      )}

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
