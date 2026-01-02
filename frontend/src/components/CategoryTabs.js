import { Link } from "react-router-dom";

const CategoryTabs = ({ category }) => {
  return (
    <div className="category-container">
      {category === "numOfPlayers" ? (
        <>
          <div className="categories-title">Number of Players</div>
          <div className="category-cards">
            <Link to="/board-games?filter=2">
              <div className="category-card">
                <div className="category-card-img">slika</div>
                <div className="category-card-text">2</div>
              </div>
            </Link>
            <Link to="/board-games?filter=2-4">
              <div className="category-card">
                <div className="category-card-img">slika</div>
                <div className="category-card-text">2-4</div>
              </div>
            </Link>
            <Link to="/board-games?filter=4plus">
              <div className="category-card">
                <div className="category-card-img">slika</div>
                <div className="category-card-text">4+</div>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="categories-title">Difficulty</div>
          <div className="category-cards">
            <Link to="/board-games?filter=easy">
              <div className="category-card">
                <div className="category-card-img">slika</div>
                <div className="category-card-text">EASY</div>
              </div>
            </Link>
            <Link to="/board-games?filter=medium">
              <div className="category-card">
                <div className="category-card-img">slika</div>
                <div className="category-card-text">MEDIUM</div>
              </div>
            </Link>
            <Link to="/board-games?filter=hard">
              <div className="category-card">
                <div className="category-card-img">slika</div>
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
