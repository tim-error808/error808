import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import api from "../../api/api";
import { Link } from "react-router-dom";

const MyGames = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const canPost = !!user?.location?.city;

  return (
    <div className="my-games-page">
      <div className="my-games-header">
        <h2>My Games</h2>
        {canPost && (
          <Link to="/board-games/new" className="primary-button">
            Post Game
          </Link>
        )}
        {!canPost && (
          <div className="info-message">
            Please pick location in your <Link to="/profile">Profile</Link> to
            post games.
          </div>
        )}
      </div>
      <div className="my-games-list">
        {/* mock data for now */}
        <div className="game-card my-game-card">
          <div className="game-card-img">
            <img src="IMAGE_URL" alt="Naziv igre" />
          </div>

          <div className="game-card-details">
            <h3 className="game-title">Naziv igre</h3>

            <div className="game-details">
              <span className="genre">Strategija</span>
              <span className="publisher">Ravensburger</span>
              <span className="players">2–4 igrača</span>
              <span className="playtime">60 min</span>
              <span className="difficulty">Težina: 3</span>
            </div>
          </div>

          <div className="my-game-actions">
            <button className="secondary-button">Uredi</button>
          </div>
        </div>
        <div className="game-card my-game-card">
          <div className="game-card-img">
            <img src="IMAGE_URL" alt="Naziv igre" />
          </div>

          <div className="game-card-details">
            <h3 className="game-title">Naziv igre</h3>

            <div className="game-details">
              <span className="genre">Strategija</span>
              <span className="publisher">Ravensburger</span>
              <span className="players">2–4 igrača</span>
              <span className="playtime">60 min</span>
              <span className="difficulty">Težina: 3</span>
            </div>
          </div>

          <div className="my-game-actions">
            <button className="secondary-button">Uredi</button>
          </div>
        </div>
        <div className="game-card my-game-card">
          <div className="game-card-img">
            <img src="IMAGE_URL" alt="Naziv igre" />
          </div>

          <div className="game-card-details">
            <h3 className="game-title">Naziv igre</h3>

            <div className="game-details">
              <span className="genre">Strategija</span>
              <span className="publisher">Ravensburger</span>
              <span className="players">2–4 igrača</span>
              <span className="playtime">60 min</span>
              <span className="difficulty">Težina: 3</span>
            </div>
          </div>

          <div className="my-game-actions">
            <button className="secondary-button">Uredi</button>
          </div>
        </div>
        <div className="game-card my-game-card">
          <div className="game-card-img">
            <img src="IMAGE_URL" alt="Naziv igre" />
          </div>

          <div className="game-card-details">
            <h3 className="game-title">Naziv igre</h3>

            <div className="game-details">
              <span className="genre">Strategija</span>
              <span className="publisher">Ravensburger</span>
              <span className="players">2–4 igrača</span>
              <span className="playtime">60 min</span>
              <span className="difficulty">Težina: 3</span>
            </div>
          </div>

          <div className="my-game-actions">
            <button className="secondary-button">Uredi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGames;
