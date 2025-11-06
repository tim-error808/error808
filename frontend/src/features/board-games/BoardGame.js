import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

const BoardGame = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/board-games/${id}`)
      .then((response) => {
        setGame(response.data);
        setError("");
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <PulseLoader color="#000" className="loader" />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <section className="game">
      <h2 className="game-title">{game.naziv}</h2>
      <div className="game-details">
        <span className="genre">{game.žanr}</span>
        <span className="publisher">
          {game.izdavač} ({game.godina_izdanja})
        </span>
        <span className="players">Broj igrača: {game.broj_igrača}</span>
        <span className="playtime">
          Vrijeme igranja: {game.vrijeme_igranja}
        </span>
        <span className="difficulty">Težina: {game.procjena_težine}</span>
        <span className="condition">
          Očuvanost: {game.ocjena_očuvanosti}/10
        </span>
      </div>
      <p className="description">{game.opis}</p>
    </section>
  );
};

export default BoardGame;
