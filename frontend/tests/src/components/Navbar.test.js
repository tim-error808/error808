import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../src/components/Navbar';


jest.mock('../../../src/components/NavLinks', () => () => <div data-testid="nav-links">Mocked NavLinks</div>);

describe('Navbar component', () => {
  test('renders logo image and title link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    
    const logoImg = screen.getByAltText(/logo/i);
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src'/*, expect.stringContaining('logo.svg')*/);

   
    const titleLink = screen.getByRole('link', { name: /naslov/i });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', '/');
  });

  test('renders NavLinks component', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

   
    expect(screen.getByTestId('nav-links')).toBeInTheDocument();
  });
});