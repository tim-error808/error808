import { useState, useEffect } from "react";
import api from "../../api/api";
import PulseLoader from "react-spinners/PulseLoader";
import { useAuth } from "../../hooks/AuthProvider";

const MyOffers = () => {
  const { isAuthenticated } = useAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/trades/my")
      .then((response) => {
        setOffers(response.data);
        setError("");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (loading) return <PulseLoader className="loader" color="#05808c" />;

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="received-offers-page">
      <h2>My Offers</h2>

      <div className="offers-list">
        {offers.length === 0 && (
          <div className="info-message">You have no offers.</div>
        )}

        {offers.map((offer) => (
          <div key={offer._id} className="offer-card">
            <div className="offer-header">
              <h3>To: {offer.receiver.username}</h3>
              <span>Email: {offer.receiver.email}</span>
              <span>
                Status:
                <span className={`status ${offer.status}`}>{offer.status}</span>
              </span>
            </div>

            <div className="offer-details">
              <p>Your Offered Games:</p>
              <ul>
                {offer.offeredListings.map((listing) => (
                  <li key={listing._id}>{listing.name}</li>
                ))}
              </ul>

              <p>Requested Games:</p>
              <ul>
                {offer.requestedListings.map((listing) => (
                  <li key={listing._id}>{listing.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOffers;
