import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { InquiryForm } from '@/app/inquiry/inquiry-form';
import api from '../api/axios';

jest.mock('../api/axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

jest.mock('sonner', () => ({
  toast: jest.fn(),
}));

const mockPost = jest.mocked(api.post);
mockPost.mockResolvedValue({ success: true });

afterEach(() => {
  mockPost.mockClear();
});

it('submits with valid data should fire API call', async () => {
  render(<InquiryForm />);
  fireEvent.change(screen.getByLabelText('Inquiry Title'), {
    target: { value: 'Test title' },
  });
  fireEvent.change(screen.getByLabelText('Description'), {
    target: { value: 'Test description' },
  });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith('/mail/inquiry', {
      title: 'Test title',
      description: 'Test description',
    });
  });
});

it('submits with empty title field should not fire API call', async () => {
  render(<InquiryForm />);
  fireEvent.change(screen.getByLabelText('Description'), {
    target: { value: 'Test description' },
  });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(
    await screen.findByTestId('inquiry-form-title-error')
  ).toBeInTheDocument();
  expect(mockPost).not.toHaveBeenCalled();
});

it('submits with empty description field should not fire API call', async () => {
  render(<InquiryForm />);
  fireEvent.change(screen.getByLabelText('Inquiry Title'), {
    target: { value: 'Test title' },
  });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(
    await screen.findByTestId('inquiry-form-description-error')
  ).toBeInTheDocument();
  expect(mockPost).not.toHaveBeenCalled();
});
