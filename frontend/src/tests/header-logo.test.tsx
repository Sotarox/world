import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderLogo from '../components/world/header-logo';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => jest.fn(),
}));

describe('HeaderLogo Component', () => {
  test('renders "World" text', () => {
    render(<HeaderLogo />);
    expect(screen.getByText('World')).toBeInTheDocument();
  });
});
