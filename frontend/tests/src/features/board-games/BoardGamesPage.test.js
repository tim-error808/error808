import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { BoardGamesPage } from "../../../../src/features/board-games/BoardGamesPage";

// Mock podkomponente
jest.mock("../../../../src/features/board-games/Filter", () => jest.fn(() => <div data-testid="filter-component" />));
jest.mock("../../../../src/features/board-games/Search", () => jest.fn(() => <div data-testid="search-component" />));
jest.mock("../../../../src/features/board-games/BoardGamesList", () => jest.fn(() => <div data-testid="board-games-list" />));

// Mock useSearchParams iz react-router-dom
const mockSetSearchParams = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("BoardGamesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
  });

  test("renders Filter, Search, and BoardGamesList components", () => {
    render(
      <MemoryRouter>
        <BoardGamesPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("filter-component")).toBeInTheDocument();
    expect(screen.getByTestId("search-component")).toBeInTheDocument();
    expect(screen.getByTestId("board-games-list")).toBeInTheDocument();
  });

  test("calls setSearchParams when filters change", () => {
    const mockFilters = ["easy", "2players"];
    const { BoardGamesPage: TestedPage } = require("../../../../src/features/board-games/BoardGamesPage");

    render(
      <MemoryRouter>
        <TestedPage />
      </MemoryRouter>
    );

    // dohvati mock komponentu Filter i pokreni njen onChangeFilters prop
    const FilterMock = require("../../../../src/features/board-games/Filter");
    FilterMock.mock.calls[0][0].onChangeFilters(mockFilters);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const paramsString = mockSetSearchParams.mock.calls[0][0].toString();
    expect(paramsString).toContain("filter=easy");
    expect(paramsString).toContain("filter=2players");
  });

  test("calls setSearchParams when search text changes", () => {
    const { BoardGamesPage: TestedPage } = require("../../../../src/features/board-games/BoardGamesPage");

    render(
      <MemoryRouter>
        <TestedPage />
      </MemoryRouter>
    );

    const SearchMock = require("../../../../src/features/board-games/Search");
    SearchMock.mock.calls[0][0].onSearchChange("catan");

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const paramsString = mockSetSearchParams.mock.calls[0][0].toString();
    expect(paramsString).toContain("search=catan");
  });
});
