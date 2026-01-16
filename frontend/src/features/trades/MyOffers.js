import { useState, useEffect } from "react";
import api from "../../api/api";
import { PulseLoader } from "react-spinners";

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

  if (loading) {
    return (
      <div className="loader">
        <PulseLoader color="black" />
      </div>
    );
  }

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="received-offers-page">
      <h2>My Offers</h2>

      <div className="offers-list">
        {offers.length === 0 && (
          <div className="info-message offers">You have no offers.</div>
        )}

        {offers.map((offer) => (
          <div key={offer._id} className="offer-card">
            <div className="offer-header">
              <h3>To: {offer.receiverId.username}</h3>
              <span>Email: {offer.receiverId.email}</span>
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
