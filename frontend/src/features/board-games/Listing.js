import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import ModeConfig from "../../config/ModeConfig";

const Listing = () => {
  const { apiUri } = ModeConfig();
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${apiUri}/board-games/${id}`)
      .then((response) => {
        setListing(response.data);
        setError("");
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [id, apiUri]);

  if (isLoading) {
    return <PulseLoader color="#000" className="loader" />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <section className="game">
      <h2 className="game-title">{listing.game.naziv}</h2>
      <div className="game-details">
        <span className="genre">{listing.game.žanr}</span>
        <span className="publisher">
          {listing.game.izdavač} ({listing.game.godina_izdanja})
        </span>
        <span className="players">Broj igrača: {listing.game.broj_igrača}</span>
        <span className="playtime">
          Vrijeme igranja: {listing.game.vrijeme_igranja}
        </span>
        <span className="difficulty">
          Težina: {listing.game.procjena_težine}
        </span>
        <span className="condition">
          Očuvanost: {listing.game.ocjena_očuvanosti}/10
        </span>
      </div>
      <p className="description">{listing.game.opis}</p>
    </section>
  );
};

export default Listing;
