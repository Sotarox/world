import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Inquiry } from '@/app/inquiry/inquiry';
import api from '../api/axios';

jest.mock('../api/axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

const mockPost = jest.mocked(api.post);
mockPost.mockResolvedValue({ success: true });

afterEach(() => {
  mockPost.mockClear();
});

it('submits with valid data should fire API call', async () => {
  render(<Inquiry />);
  await userEvent.type(screen.getByLabelText('Inquiry Title'), 'Test title');
  await userEvent.type(
    screen.getByLabelText('Description'),
    'Test description'
  );
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(mockPost).toHaveBeenCalledWith('/mail/inquiry', {
    title: 'Test title',
    description: 'Test description',
  });
});

it('submits with empty title field should not fire API call', async () => {
  render(<Inquiry />);
  await userEvent.type(
    screen.getByLabelText('Description'),
    'Test description'
  );
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByTestId('inquiry-title-error')).toBeInTheDocument();
  expect(mockPost).not.toHaveBeenCalled();
});

it('submits with empty description field should not fire API call', async () => {
  render(<Inquiry />);
  await userEvent.type(screen.getByLabelText('Inquiry Title'), 'Test title');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByTestId('inquiry-description-error')).toBeInTheDocument();
  expect(mockPost).not.toHaveBeenCalled();
});
