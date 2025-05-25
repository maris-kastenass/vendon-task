import { render, screen, fireEvent } from '@testing-library/react';
import Result from '../pages/Result';

import type { TestResults } from '../types/tests';

const { expect, describe, it } = require('@jest/globals');

describe('Result Component', () => {
  const mockResetAll = jest.fn();

  const mockClientResults: TestResults = {
    name: 'Maris',
    testKey: '3',
    correctAnsweredQuestionCount: 3,
    answeredQuestionCount: 5,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders thank you message with clientResults', () => {
    render(<Result clientResults={mockClientResults} resetAll={mockResetAll} />);
    
    expect(screen.getByText(/Thank You, Maris!/)).toBeInTheDocument();
    expect(screen.getByText(/You answered correctly on 3 out of 5 questions/)).toBeInTheDocument();
  });

  it('renders fallback message without clientResults', () => {
    render(<Result clientResults={null} resetAll={mockResetAll} />);
    
    expect(screen.getByText(/Sory cant find Your results!/)).toBeInTheDocument();
  });

  it('calls resetAll when button is clicked', () => {
    render(<Result clientResults={mockClientResults} resetAll={mockResetAll} />);
    
    const button = screen.getByRole('button', { name: /Start Again/i });
    fireEvent.click(button);

    expect(mockResetAll).toHaveBeenCalledTimes(1);
  });
});
