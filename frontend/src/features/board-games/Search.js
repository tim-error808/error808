const Search = ({ searchText, onSearchChange }) => {
  return (
    <div className="games-search-bar">
      <h2>Board Games</h2>
      <input
        type="text"
        id="search-games"
        name="search-games"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
