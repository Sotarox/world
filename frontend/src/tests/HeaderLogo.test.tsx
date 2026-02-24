import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderLogo from '../units/HeaderLogo';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useRouter: () => jest.fn(),
}));

describe('HeaderLogo Component', () => {
  test('renders "World" text', () => {
    render(<HeaderLogo />);
    expect(screen.getByText('World')).toBeInTheDocument();
  });
});
