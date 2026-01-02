import { useState, useEffect } from "react";
import api from "../../api/api";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import GameNotFound from "./GameNotFound";

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
        api
          .get(`/board-games?${params.toString()}`)
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
      api
        .get(`/board-games?${params.toString()}`)
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
      navigate("/auth");
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

  if (searchText && boardGames.length === 0) {
    return <GameNotFound searchText={searchText} />;
  }

  content = boardGames.map((game, index) => (
    <section key={index} className="game-card">
      <Link to={`${game.id}`}>
        <p className="game-card-img">slika</p>
        <div className="game-card-details">
          <div className="game-title">{game.name}</div>
          <p>Difficulty: {game.difficulty}/5</p>
          <p>Min Players: {game.minPlayers}</p>
          <p>Max Players: {game.maxPlayers}</p>
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
