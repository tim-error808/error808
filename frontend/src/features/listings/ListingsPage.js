import Filter from "./Filter";
import Search from "./Search";
import ListingsList from "./ListingsList";
import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

const ListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.getAll("filter") || "";

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(initialFilter);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="board-games-page">
      <Filter filters={filters} onChangeFilters={handleFiltersChange} />
      <div className="games-list">
        <Search searchText={searchText} onSearchChange={handleSearchChange} />
        <ListingsList filters={filters} searchText={searchText} />
      </div>
      <button
        onClick={scrollToTop}
        className={`scroll-btn ${showScrollBtn ? "show" : ""}`}
        title="Go to top"
      >
        &#8593;
      </button>
    </div>
  );
};

export default ListingsPage;
