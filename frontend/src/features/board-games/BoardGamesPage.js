import Filter from "./Filter";
import Search from "./Search";
import BoardGamesList from "./BoardGamesList";
import { useState } from "react";

import { useSearchParams } from "react-router-dom";

export const BoardGamesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.getAll("filter") || "";

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(initialFilter);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    newFilters.forEach((f) => params.append("filter", f));
    if (searchText) params.set("search", searchText);
    setSearchParams(params);
  };

  const handleSearchChange = (newText) => {
    setSearchText(newText);
    const params = new URLSearchParams();
    filters.forEach((f) => params.append("filter", f));
    if (newText) params.set("search", newText);
    setSearchParams(params);
  };

  return (
    <div className="board-games-page">
      <Filter filters={filters} onChangeFilters={handleFiltersChange} />
      <div className="games-list">
        <Search searchText={searchText} onSearchChange={handleSearchChange} />
        <BoardGamesList filters={filters} searchText={searchText} />
      </div>
    </div>
  );
};
