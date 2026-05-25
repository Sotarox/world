import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchButton from '@/components/world/search-button';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

describe('SearchButton', () => {
  it('opens search dialog when button is clicked', () => {
    render(<SearchButton />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /open search dialog/i })
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country Name')).toHaveValue('');
  });

  it('exposes keyboard shortcuts for assistive tech', () => {
    render(<SearchButton />);

    expect(
      screen.getByRole('button', { name: /open search dialog/i })
    ).toHaveAttribute('aria-keyshortcuts', 'Control+K Meta+K');
  });

  it('opens search dialog on Ctrl+K', () => {
    render(<SearchButton />);

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens search dialog on Meta+K', () => {
    render(<SearchButton />);

    fireEvent.keyDown(window, { key: 'k', metaKey: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not open search dialog for unrelated keys', () => {
    render(<SearchButton />);

    fireEvent.keyDown(window, { key: 'a', ctrlKey: true });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
