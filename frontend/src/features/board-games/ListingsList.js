import { useState, useEffect } from "react";
import api from "../../api/api";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import ListingNotFound from "./ListingNotFound";
import TradeOfferWindow from "../trades/TradeOfferWindow";

const ListingsList = ({ filters, searchText }) => {
  const [listings, setListings] = useState([]);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    filters.forEach((f) => params.append("filter", f));
    if (searchText) {
      params.append("search", searchText);
      const timer = setTimeout(() => {
        api
          .get(`/listings?${params.toString()}`)
          .then((response) => {
            setListings(response.data);
          })
          .catch((error) => {
            setError(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 500);

      return () => clearTimeout(timer);
    } else {
      api
        .get(`/listings?${params.toString()}`)
        .then((response) => {
          setListings(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [filters, searchText]);

  const onOfferClicked = ({ listingId }) => {
    if (!user?.email) {
      navigate("/auth");
    }

    setSelectedListingId(listingId);
    setShowTradeModal(true);
  };

  let content;

  if (isLoading) {
    return (
      <div className="loader">
        <PulseLoader color="#000" />
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (searchText && boardGames.length === 0) {
    return <ListingNotFound searchText={searchText} />;
  }

  content = listings.map((listing) => (
    <section key={listing.listingId} className="game-card">
      <Link to={`${listing.listingId}`}>
        <p className="game-card-img">slika</p>
        {/* lazy loading za sliku */}
        <div className="game-card-details">
          <div className="game-title">{listing.game.name}</div>
          <p>Difficulty: {listing.game.difficulty}/5</p>
          <p>Min Players: {listing.game.minPlayers}</p>
          <p>Max Players: {listing.game.maxPlayers}</p>
        </div>
      </Link>
      <button
        onClick={() => {
          if (!isAuthenticated) {
            navigate("/auth");
          }
          onOfferClicked(listing.listingId);
        }}
        className="game-card-button"
      >
        Offer Exchange
      </button>
    </section>
  ));

  return (
    <>
      <div className="games">{content}</div>

      {showTradeModal && (
        <div className="modal-overlay">
          <TradeOfferWindow
            requestedListingId={selectedListingId}
            onClose={() => {
              setShowTradeModal(false);
              setSelectedListingId(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default ListingsList;
