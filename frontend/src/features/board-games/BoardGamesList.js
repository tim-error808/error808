import { useState, useEffect } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import { REST_API_URI } from "../../config/CONSTANTS";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const BoardGamesList = ({ filters, searchText }) => {
  const [boardGames, setBoardGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    filters.forEach((f) => params.append("filter", f));
    if (searchText) {
      params.append("search", searchText);
      const timer = setTimeout(() => {
        axios
          .get(
            `${REST_API_URI}/board-games?${params.toString()}`
          )
          .then((response) => {
            setBoardGames(response.data);
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
      axios
        .get(
          `${REST_API_URI}/board-games?${params.toString()}`
        )
        .then((response) => {
          setBoardGames(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [filters, searchText]);

  const onOfferClicked = () => {
    if (!user?.email) {
      navigate("/login");
    }
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

  content = boardGames.map((game) => (
    <section key={game.id} className="game-card">
      <Link to={`${game.id}`}>
        <p className="game-card-img">slika</p>
        <div className="game-card-details">
          <div className="game-title">{game.naziv}</div>
          <p>Očuvanost: {game.ocjena_očuvanosti}/10</p>
          <p>grad</p>
        </div>
      </Link>
      <button onClick={onOfferClicked} className="game-card-button">
        Offer Exchange
      </button>
    </section>
  ));

  return <div className="games">{content}</div>;
};

export default BoardGamesList;
