import { Link } from "react-router-dom";
import CategoryTabs from "./CategoryTabs";

const Public = () => {
  return (
    <section className="public">
      <h1>Exchange Board Games</h1>
      <p>Portal to world of exchanging board games.</p>
      <Link className="public-browse-link" to="/board-games">
        Browse All Games
      </Link>
      <h2>Categories</h2>
      <div className="categories">
        <CategoryTabs category={"difficulty"} />
        <div className="categories-middle-line"></div>
        <CategoryTabs category={"numOfPlayers"} />
      </div>
    </section>
  );
};

export default Public;
