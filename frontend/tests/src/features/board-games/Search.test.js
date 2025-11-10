import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../../../../src/features/board-games/Search";
describe("Search component", () => {
  test("renders heading and input field", () => {
    render(<Search searchText="" onSearchChange={jest.fn()} />);

    // Heading
    expect(screen.getByRole("heading", { name: /board games/i })).toBeInTheDocument();

    // Input field
    const input = screen.getByPlaceholderText(/search.../i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  test("displays the current search text", () => {
    render(<Search searchText="Catan" onSearchChange={jest.fn()} />);
    const input = screen.getByPlaceholderText(/search.../i);

    expect(input).toHaveValue("Catan");
  });

  test("calls onSearchChange when typing", () => {
    const onSearchChange = jest.fn();
    render(<Search searchText="" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: "Terraforming Mars" } });

    expect(onSearchChange).toHaveBeenCalledTimes(1);
    expect(onSearchChange).toHaveBeenCalledWith("Terraforming Mars");
  });
});
