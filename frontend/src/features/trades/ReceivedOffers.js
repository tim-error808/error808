import { useState, useEffect } from "react";
import api from "../../api/api";
import { PulseLoader } from "react-spinners";
import TradeOfferWindow from "../trades/TradeOfferWindow";

const ReceivedOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);

  useEffect(() => {
    api
      .get(`/trades/received`)
      .then((response) => {
        setOffers(response.data);
        setError("");
      })
      .catch((error) => setError(error.response?.data?.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <PulseLoader color="black" />
      </div>
    );
  }

  if (error) return <div className="error">Error: {error}</div>;

  const handleAccept = async (offerId) => {
    try {
      await api.put(`/trades/${offerId}/accept`);
      setOffers((prev) => prev.filter((offer) => offer._id !== offerId));
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const handleDecline = async (offerId) => {
    try {
      await api.put(`/trades/${offerId}/decline`);
      setOffers((prev) => prev.filter((offer) => offer._id !== offerId));
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setShowTradeModal(true);
  };

  return (
    <div className="received-offers-page">
      <h2>Received Offers</h2>
      <div className="offers-list">
        {offers.length === 0 && (
          <div className="info-message offers">
            You have no new received offers.
          </div>
        )}
        {offers.map((offer) => (
          <div key={offer._id} className="offer-card">
            <div className="offer-header">
              <h3>From: {offer.initiatorId.username}</h3>
              <span>Email: {offer.initiatorId.email}</span>
            </div>

            <div className="offer-details">
              <p>Requested Games:</p>
              <ul>
                {offer.requestedListings.map((listing) => (
                  <li key={listing._id}>{listing.name}</li>
                ))}
              </ul>

              <p>Offered Games:</p>
              <ul>
                {offer.offeredListings.map((listing) => (
                  <li key={listing._id}>{listing.name}</li>
                ))}
              </ul>
            </div>

            <div className="offer-actions">
              <button
                className="primary-button"
                onClick={() => handleAccept(offer._id)}
              >
                Accept
              </button>
              <button
                className="secondary-button"
                onClick={() => handleDecline(offer._id)}
              >
                Decline
              </button>
              <button
                className="secondary-button"
                onClick={() => handleEdit(offer)}
              >
                Edit Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      {showTradeModal && selectedOffer && (
        <div className="modal-overlay">
          <TradeOfferWindow
            requestedListingId={selectedOffer._id}
            onClose={() => {
              setShowTradeModal(false);
              setSelectedOffer(null);
            }}
            isCounterOffer={true}
            originalOffer={selectedOffer}
          />
        </div>
      )}
    </div>
  );
};

export default ReceivedOffers;
