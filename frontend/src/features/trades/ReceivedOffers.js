import { useState, useEffect } from "react";
import api from "../../api/api";
import PulseLoader from "react-spinners/PulseLoader";
import { useAuth } from "../../hooks/AuthProvider";
import TradeOfferWindow from "../trades/TradeOfferWindow";

const ReceivedOffers = () => {
  const { isAuthenticated } = useAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get(`/trades/received`)
      .then((response) => {
        setOffers(response.data);
        setError("");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (loading) return <PulseLoader className="loader" color="#0000" />;

  if (error) return <div className="error">Error: {error}</div>;

  const handleAccept = async (offerId) => {
    try {
      await api.put(`/trades/${offerId}/accept`);
      setOffers((prev) => prev.filter((offer) => offer._id !== offerId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (offerId) => {
    try {
      await api.put(`/trades/${offerId}/decline`);
      setOffers((prev) => prev.filter((offer) => offer._id !== offerId));
    } catch (err) {
      console.log(err);
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
        {offers.map((offer) => (
          <div key={offer._id} className="offer-card">
            <div className="offer-header">
              <h3>From: {offer.initiator.username}</h3>
              <span>Email: {offer.initiator.email}</span>
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
            isCounterOffer
          />
        </div>
      )}
    </div>
  );
};

export default ReceivedOffers;
