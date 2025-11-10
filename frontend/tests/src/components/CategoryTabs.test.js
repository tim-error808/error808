import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryTabs from '../../../src/components/CategoryTabs';

describe('CategoryTabs component', () => {
  test('renders "Number of Players" section when category is numOfPlayers', () => {
    render(
      <MemoryRouter>
        <CategoryTabs category="numOfPlayers" />
      </MemoryRouter>
    );


    expect(screen.getByText(/Number of Players/i)).toBeInTheDocument();


    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('2-4')).toBeInTheDocument();
    expect(screen.getByText('4+')).toBeInTheDocument();

   
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/board-games?filter=two');
    expect(links[1]).toHaveAttribute('href', '/board-games?filter=twoToFour');
    expect(links[2]).toHaveAttribute('href', '/board-games?filter=fourPlus');
  });

  test('renders "Difficulty" section when category is not numOfPlayers', () => {
    render(
      <MemoryRouter>
        <CategoryTabs category="difficulty" />
      </MemoryRouter>
    );

    
    expect(screen.getByText(/Difficulty/i)).toBeInTheDocument();

   
    expect(screen.getByText('EASY')).toBeInTheDocument();
    expect(screen.getByText('MEDIUM')).toBeInTheDocument();
    expect(screen.getByText('HARD')).toBeInTheDocument();

    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/board-games?filter=easy');
    expect(links[1]).toHaveAttribute('href', '/board-games?filter=medium');
    expect(links[2]).toHaveAttribute('href', '/board-games?filter=hard');
  });
});