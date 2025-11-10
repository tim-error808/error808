import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../../../../src/features/board-games/Filter"; // adjust path if needed

describe("Filter component", () => {
  const setup = (filters = []) => {
    const onChangeFilters = jest.fn();
    render(<Filter filters={filters} onChangeFilters={onChangeFilters} />);
    return { onChangeFilters };
  };

  test("renders all filter checkboxes", () => {
    setup();

    // All difficulty options
    expect(screen.getByLabelText(/Easy/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Medium/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hard/i)).toBeInTheDocument();

    // All player options
    expect(screen.getByLabelText(/2 players/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/2-4 players/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/4\+ players/i)).toBeInTheDocument();
  });

  test("marks correct checkboxes as checked", () => {
    setup(["easy", "two"]);

    expect(screen.getByLabelText(/Easy/i)).toBeChecked();
    expect(screen.getByLabelText(/2 players/i)).toBeChecked();

    expect(screen.getByLabelText(/Medium/i)).not.toBeChecked();
    expect(screen.getByLabelText(/Hard/i)).not.toBeChecked();
    expect(screen.getByLabelText(/2-4 players/i)).not.toBeChecked();
    expect(screen.getByLabelText(/4\+ players/i)).not.toBeChecked();
  });

  test("calls onChangeFilters when checkbox is clicked", () => {
    const { onChangeFilters } = setup([]);

    const easyCheckbox = screen.getByLabelText(/Easy/i);
    fireEvent.click(easyCheckbox);

    // Should call onChangeFilters with ["easy"]
    expect(onChangeFilters).toHaveBeenCalledWith(["easy"]);
  });

  test("removes filter when checkbox is unchecked", () => {
    const { onChangeFilters } = setup(["easy", "medium"]);

    const mediumCheckbox = screen.getByLabelText(/Medium/i);
    fireEvent.click(mediumCheckbox);

    // Should remove "medium" from filters
    expect(onChangeFilters).toHaveBeenCalledWith(["easy"]);
  });
});
