const Filter = ({ filters, onChangeFilters }) => {
  const handleCheckboxChange = (e) => {
    const value = e.target.name;
    const newFilters = filters.includes(value)
      ? filters.filter((f) => f !== value)
      : [...filters, value];
    onChangeFilters(newFilters);
  };

  return (
    <section className="search-bar">
      <h3>Product filters</h3>
      <h4>Dfficulty</h4>
      <div className="filters">
        <label>
          <input
            type="checkbox"
            name="easy"
            checked={filters.includes("easy")}
            onChange={handleCheckboxChange}
          />
          Easy
        </label>
        <label>
          <input
            type="checkbox"
            name="medium"
            checked={filters.includes("medium")}
            onChange={handleCheckboxChange}
          />
          Medium
        </label>
        <label>
          <input
            type="checkbox"
            name="hard"
            checked={filters.includes("hard")}
            onChange={handleCheckboxChange}
          />
          Hard
        </label>
      </div>
      <h4>Number Of Players</h4>
      <div className="filters">
        <label>
          <input
            type="checkbox"
            name="2"
            checked={filters.includes("2")}
            onChange={handleCheckboxChange}
          />
          2 players
        </label>
        <label>
          <input
            type="checkbox"
            name="2-4"
            checked={filters.includes("2-4")}
            onChange={handleCheckboxChange}
          />
          2-4 players
        </label>
        <label>
          <input
            type="checkbox"
            name="4plus"
            checked={filters.includes("4plus")}
            onChange={handleCheckboxChange}
          />
          4+ players
        </label>
      </div>
      <div className="filters">
        <label>
          <input
            type="checkbox"
            name="forYou"
            checked={filters.includes("forYou")}
            onChange={handleCheckboxChange}
          />
          Just for you
        </label>
      </div>
    </section>
  );
};

export default Filter;
