import { useState, useEffect } from "react";
import api from "../../api/api";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import ScrollButton from "../../components/ScrollButton";

const MyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/trades/my")
      .then((response) => {
        setOffers(response.data);
        setError("");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const canAct = (offer) => {
    if (!offer.lastCounterBy) return false;
    return offer.lastCounterBy !== offer.initiatorId;
  };

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

  return (
    <div className="received-offers-page">
      <h2>My Offers</h2>

      <div className="offers-list">
        {offers.length === 0 && (
          <div className="info-message offers">You have no offers.</div>
        )}

        {offers.map((offer) => {
          const act = canAct(offer);

          return (
            <div key={offer._id} className="offer-card">
              <div className="offer-header">
                <h3>To: {offer.receiverId.username}</h3>
                <span>Email: {offer.receiverId.email}</span>
                <span>
                  Status:{" "}
                  <span className={`offer-status ${offer.status}`}>
                    {offer.status}
                  </span>
                </span>
              </div>

              <div className="offer-details">
                <p>
                  {offer.status === "active"
                    ? "You offered"
                    : `${offer.receiverId.username} wants:`}
                </p>
                <ul>
                  {offer.offeredListings.map((listing) => (
                    <li key={listing._id}>
                      <Link
                        className="listing-link"
                        to={`/listings/details/${listing._id}`}
                      >
                        {listing.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p>{offer.receiverId.username} has:</p>
                <ul>
                  {offer.requestedListings.map((listing) => (
                    <li key={listing._id}>
                      <Link
                        className="listing-link"
                        to={`/listings/details/${listing._id}`}
                      >
                        {listing.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {act ? (
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
                </div>
              ) : (
                <p>
                  Waiting for {offer.receiverId.username} to edit, accept or
                  decline offer.
                </p>
              )}
            </div>
          );
        })}
      </div>
      <ScrollButton />
    </div>
  );
};

export default MyOffers;
