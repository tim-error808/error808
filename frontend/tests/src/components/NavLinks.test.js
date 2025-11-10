import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavLinks from '../../../src/components/NavLinks';

// Mockaj useAuth da možeš kontrolirati user.email vrijednost
jest.mock('../../../src/features/auth/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from '../../../src/features/auth/AuthProvider';

describe('NavLinks component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dropdown button and closed state by default', () => {
    useAuth.mockReturnValue({ user: { email: '' } }); // korisnik nije prijavljen

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    // Prikazuje "My Account" gumb
    expect(screen.getByRole('button', { name: /my account/i })).toBeInTheDocument();

    // Dropdown je inicijalno neaktivan
    const dropdown = screen.getByRole('button', { name: /my account/i });
    expect(dropdown).toBeInTheDocument();

    // Provjeri da postoji container s klasom inactive
    const dropdownContent = document.querySelector('.dropdown-content-inactive');
    expect(dropdownContent).toBeInTheDocument();
  });

  test('toggles dropdown content when button is clicked', () => {
    useAuth.mockReturnValue({ user: { email: '' } });

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /my account/i });

    // Klikni za otvaranje
    fireEvent.click(button);
    expect(document.querySelector('.dropdown-content-active')).toBeInTheDocument();

    // Klikni ponovno za zatvaranje
    fireEvent.click(button);
    expect(document.querySelector('.dropdown-content-inactive')).toBeInTheDocument();
  });

  test('renders login link when user is not logged in', () => {
    useAuth.mockReturnValue({ user: { email: '' } });

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    // Otvori dropdown
    fireEvent.click(screen.getByRole('button', { name: /my account/i }));

    // Provjeri da postoji "Log In"
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();

    // "Edit Profile" se ne bi trebao prikazati
    expect(screen.queryByRole('link', { name: /edit profile/i })).not.toBeInTheDocument();
  });

  test('renders edit profile link when user is logged in', () => {
    useAuth.mockReturnValue({ user: { email: 'user@example.com' } });

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    // Otvori dropdown
    fireEvent.click(screen.getByRole('button', { name: /my account/i }));

    // Provjeri da postoji "Edit Profile"
    expect(screen.getByRole('link', { name: /edit profile/i })).toBeInTheDocument();

    // "Log In" ne bi trebao biti vidljiv
    expect(screen.queryByRole('link', { name: /log in/i })).not.toBeInTheDocument();
  });
});
