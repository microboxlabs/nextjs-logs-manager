import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

describe('Home', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Home />);
    expect(screen.getByText('LogsManager. Here you can view and upload all your logs')).toBeInTheDocument();
  });

  it('renders Get Started link', () => {
    render(<Home />);
    const linkElement = screen.getByRole('link', { name: /Get Started/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/login');
  });
});
