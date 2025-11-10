import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import BoardGame from "../../../../src/features/board-games/BoardGame";


jest.mock("axios", () => ({
  get: jest.fn(),
}));


jest.mock("react-spinners/PulseLoader", () => () => <div>Loading...</div>);

describe("BoardGame component", () => {
  const mockGame = {
    naziv: "Catan",
    žanr: "Strategy",
    izdavač: "Kosmos",
    godina_izdanja: 1995,
    broj_igrača: "3-4",
    vrijeme_igranja: "60 min",
    procjena_težine: "Medium",
    ocjena_očuvanosti: 8,
    opis: "A game of trading and building.",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loader while fetching", async () => {
    axios.get.mockReturnValue(new Promise(() => {})); // nikad ne resolve-a

    render(
      <MemoryRouter initialEntries={["/board-games/1"]}>
        <Routes>
          <Route path="/board-games/:id" element={<BoardGame />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders error message on failed request", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter initialEntries={["/board-games/1"]}>
        <Routes>
          <Route path="/board-games/:id" element={<BoardGame />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument()
    );
  });

  test("renders game details on successful fetch", async () => {
    axios.get.mockResolvedValueOnce({ data: mockGame });

    render(
      <MemoryRouter initialEntries={["/board-games/1"]}>
        <Routes>
          <Route path="/board-games/:id" element={<BoardGame />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Catan")).toBeInTheDocument();
    expect(screen.getByText(/Strategy/i)).toBeInTheDocument();
    expect(screen.getByText(/Kosmos/i)).toBeInTheDocument();
    expect(screen.getByText(/Broj igrača: 3-4/i)).toBeInTheDocument();
    expect(screen.getByText(/Vrijeme igranja: 60 min/i)).toBeInTheDocument();
    expect(screen.getByText(/Težina: Medium/i)).toBeInTheDocument();
    expect(screen.getByText(/Očuvanost: 8\/10/i)).toBeInTheDocument();
    expect(screen.getByText(/A game of trading and building./i)).toBeInTheDocument();
  });
});
