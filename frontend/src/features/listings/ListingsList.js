import { useState, useEffect } from "react";
import api from "../../api/api";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import ListingNotFound from "./ListingNotFound";
import TradeOfferWindow from "../trades/TradeOfferWindow";
import ModeConfig from "../../config/ModeConfig";

const ListingsList = ({ filters, searchText }) => {
  const { apiUri } = ModeConfig();
  const [listings, setListings] = useState([]);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
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

  const onOfferClicked = (listing) => {
    if (!isAuthenticated) {
      navigate("/auth");
    }

    setSelectedListing(listing);
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

  if (searchText && listings.length === 0) {
    return <ListingNotFound searchText={searchText} />;
  }

  content = listings.map((listing) => (
    <section key={listing._id} className="game-card">
      <Link to={`details/${listing._id}`}>
        <div className="game-card-img">
          {listing.imageUrl ? (
            <img
              src={`${apiUri}${listing.imageUrl}`}
              alt={listing.name}
              loading="lazy"
              className="game-image"
            />
          ) : (
            <div className="image-placeholder">No image</div>
          )}
        </div>
        <div className="game-card-details">
          <div className="game-title">{listing.name}</div>
          <p>Difficulty: {listing.difficulty}/5</p>
          <p>
            Players: {listing.minPlayers}-{listing.maxPlayers}
          </p>
          <p>Location: {listing.user?.location?.city}</p>
        </div>
      </Link>
      <button
        onClick={() => {
          if (!isAuthenticated) {
            navigate("/auth");
          }
          onOfferClicked(listing);
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
            requestedListing={selectedListing}
            onClose={() => {
              setShowTradeModal(false);
              setSelectedListing(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default ListingsList;
