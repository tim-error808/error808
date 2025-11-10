import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import BoardGamesList from "../../../../src/features/board-games/BoardGamesList";

// Mock axios
jest.mock("axios", () => ({
  get: jest.fn(),
}));

// Mock react-spinners loader
jest.mock("react-spinners/PulseLoader", () => () => <div>Loading...</div>);

// Mock useAuth hook
jest.mock("../../../../src/features/auth/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("BoardGamesList component", () => {
  const { useAuth } = require("../../../../src/features/auth/AuthProvider");

  const mockGames = [
    { id: 1, naziv: "Catan", ocjena_očuvanosti: 8 },
    { id: 2, naziv: "Carcassonne", ocjena_očuvanosti: 9 },
  ];

  beforeEach(() => {
    jest.useFakeTimers(); // kontroliramo setTimeout iz komponente
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renders loader while fetching", () => {
    axios.get.mockReturnValue(new Promise(() => {})); // nikad ne završi
    useAuth.mockReturnValue({ user: {} });

    render(
      <MemoryRouter>
        <BoardGamesList filters={[]} searchText="" />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders error message on failed request", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));
    useAuth.mockReturnValue({ user: {} });

    render(
      <MemoryRouter>
        <BoardGamesList filters={[]} searchText="" />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument()
    );
  });

  test("renders list of board games on successful fetch", async () => {
    axios.get.mockResolvedValueOnce({ data: mockGames });
    useAuth.mockReturnValue({ user: { email: "test@example.com" } });

    render(
      <MemoryRouter>
        <BoardGamesList filters={[]} searchText="" />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Catan/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/Carcassonne/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Offer Exchange/i })).toHaveLength(2);
  });

  test("navigates to login if unauthenticated user clicks Offer Exchange", async () => {
    axios.get.mockResolvedValueOnce({ data: mockGames });
    useAuth.mockReturnValue({ user: {} });

    render(
      <MemoryRouter>
        <BoardGamesList filters={[]} searchText="" />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Catan/i)).toBeInTheDocument()
    );

    const offerButtons = screen.getAllByRole("button", { name: /Offer Exchange/i });
    fireEvent.click(offerButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});