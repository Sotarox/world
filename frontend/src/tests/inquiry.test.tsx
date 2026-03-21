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

it('submits valid data should fire API call', async () => {
  const mockPost = jest.mocked(api.post);
  mockPost.mockResolvedValue({ success: true });

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
