import { useState, useEffect } from "react";
import api from "../../api/api";
import { PulseLoader } from "react-spinners";

const History = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/trades/history")
      .then((response) => {
        setTrades(response.data.trades);
        setError("");
      })
      .catch((error) =>
        setError(error.response?.data?.message || "Failed to load history"),
      )
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
      <h2>Trades History</h2>

      {trades.length === 0 ? (
        <div className="info-message offers">
          You have no trades history yet.
        </div>
      ) : (
        <div className="offers-list">
          {trades.map((trade) => {
            const isInitiator = trade.role === "initiator";

            const otherUser = isInitiator
              ? trade.receiverId
              : trade.initiatorId;

            const youGave = isInitiator
              ? trade.offeredListings
              : trade.requestedListings;

            const youReceived = isInitiator
              ? trade.requestedListings
              : trade.offeredListings;

            return (
              <div key={trade._id} className="offer-card">
                <div className="offer-header">
                  <h3>Trade with {otherUser?.username || "Unknown user"}</h3>

                  <span>
                    Status:{" "}
                    <span className={`offer-status ${trade.status}`}>
                      {trade.status}
                    </span>
                  </span>
                </div>

                <div className="offer-details">
                  <div>
                    <p>
                      {trade.status === "declined"
                        ? "You would receive:"
                        : "You received:"}
                    </p>
                    <ul>
                      {youReceived.map((listing) => (
                        <li key={listing}>{listing}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p>
                      {trade.status === "declined"
                        ? "You would give:"
                        : "You gave:"}
                    </p>
                    <ul>
                      {youGave.map((listing) => (
                        <li key={listing}>{listing}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="offer-footer">
                  <span>
                    Date: {new Date(trade.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
