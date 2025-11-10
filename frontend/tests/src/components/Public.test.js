import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Public from '../../../src/components/Public';


jest.mock('../../../src/components/CategoryTabs', () => ({ category }) => (
  <div data-testid={`category-tabs-${category}`}>Mocked CategoryTabs: {category}</div>
));

describe('Public component', () => {
  test('renders main title, paragraph, and browse link', () => {
    render(
      <MemoryRouter>
        <Public />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /exchange board games/i })).toBeInTheDocument();
    expect(screen.getByText(/portal to world of exchanging board games/i)).toBeInTheDocument();

    const browseLink = screen.getByRole('link', { name: /browse all games/i });
    expect(browseLink).toBeInTheDocument();
    expect(browseLink).toHaveAttribute('href', '/board-games');
  });

  test('renders both CategoryTabs components with correct categories', () => {
    render(
      <MemoryRouter>
        <Public />
      </MemoryRouter>
    );

    const difficultyTab = screen.getByTestId('category-tabs-difficulty');
    expect(difficultyTab).toBeInTheDocument();
    expect(difficultyTab).toHaveTextContent(/difficulty/i);

    const numPlayersTab = screen.getByTestId('category-tabs-numOfPlayers');
    expect(numPlayersTab).toBeInTheDocument();
    expect(numPlayersTab).toHaveTextContent(/numofplayers/i);

    expect(document.querySelector('.categories-middle-line')).toBeInTheDocument();
  });
});
