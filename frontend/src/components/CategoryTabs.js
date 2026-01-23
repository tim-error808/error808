import { Link } from "react-router-dom";

const CategoryTabs = ({ category }) => {
  return (
    <div className="category-container">
      {category === "numOfPlayers" ? (
        <>
          <div className="categories-title">Number of Players</div>
          <div className="category-cards">
            <Link to="/listings?filter=2">
              <div className="category-card">
                <div className="category-card-img">
                  <img src="/2-players.jpg" alt="two players" />
                </div>
                <div className="category-card-text">2</div>
              </div>
            </Link>
            <Link to="/listings?filter=2-4">
              <div className="category-card">
                <div className="category-card-img">
                  <img src="/2-4-players.jpg" alt="2-4 players" />
                </div>
                <div className="category-card-text">2-4</div>
              </div>
            </Link>
            <Link to="/listings?filter=4plus">
              <div className="category-card">
                <div className="category-card-img">
                  <img src="/4plus-players.png" alt="4plus players" />
                </div>
                <div className="category-card-text">4+</div>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="categories-title">Difficulty</div>
          <div className="category-cards">
            <Link to="/listings?filter=easy">
              <div className="category-card">
                <div className="category-card-img">
                  <img src="/easy.jpg" alt="easy" />
                </div>
                <div className="category-card-text">EASY</div>
              </div>
            </Link>
            <Link to="/listings?filter=medium">
              <div className="category-card">
                <div className="category-card-img">
                  <img src="/medium.jpg" alt="medium" />
                </div>
                <div className="category-card-text">MEDIUM</div>
              </div>
            </Link>
            <Link to="/listings?filter=hard">
              <div className="category-card">
                <div className="category-card-img">
                  <img src="/hard.jpg" alt="hard" />
                </div>
                <div className="category-card-text">HARD</div>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryTabs;
