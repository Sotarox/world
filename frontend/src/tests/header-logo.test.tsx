import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderLogo from '../components/world/header-logo';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => jest.fn(),
}));

describe('HeaderLogo Component', () => {
  it('renders World Logo', () => {
    render(<HeaderLogo />);
    expect(screen.getByAltText('World Logo')).toBeInTheDocument();
  });
});
