import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../../../src/components/Layout';

jest.mock('../../../src/components/Navbar', () => () => <div>Mocked Navbar</div>);

describe('Layout component', () => {
  test('renders Navbar and Outlet', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
  });
});
