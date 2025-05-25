import { render, screen } from '@testing-library/react';
import ProgressBarComponent from '../components/ProgressBarComponent';

const { expect, describe, it } = require('@jest/globals');

describe('ProgressBarComponent', () => {
  it('renders the progress bar with correct text', () => {
    render(<ProgressBarComponent progress={3} min={0} max={5} />);
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('sets correct attributes', () => {
    render(<ProgressBarComponent progress={3} min={0} max={5} />);
    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toHaveAttribute('aria-valuenow', '3');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '5');
  });

  it('calculates and sets correct width style', () => {
    const { container } = render(<ProgressBarComponent progress={3} min={0} max={6} />);
    const progressBar = container.querySelector('.progress-bar') as HTMLElement;
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('calculates and sets 0 when max is 0 to prevent division by zero', () => {
    const { container } = render(<ProgressBarComponent progress={2} min={0} max={0} />);
    const progressBar = container.querySelector('.progress-bar') as HTMLElement;
    expect(progressBar).toHaveStyle('width: 0%');
  });
});

