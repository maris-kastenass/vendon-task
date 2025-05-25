import Homepage from '../pages/Homepage';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react';

import type { Test } from '../types/tests';

const { expect, describe, it } = require('@jest/globals');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Homepage Component', () => {
  const mockOnNameChange = jest.fn();
  const mockSetSelectedTestKey = jest.fn();

  const tests: Test[] = [
    { key: '1', title: 'Test with 3 questions',  questions: [] },
    { key: '2', title: 'Test with 4 questions',  questions: [] },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = (name = '', selectedTestKey: string | null = null) => {
    render(
      <Homepage
        name={name}
        onNameChange={mockOnNameChange}
        selectedTestKey={selectedTestKey}
        setSelectedTestKey={mockSetSelectedTestKey}
        allTests={tests}
      />
    );
  };

  it('renders all parts - input, dropdown and button', () => {
    setup();

    expect(screen.getByPlaceholderText('Enter your name.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select an option' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });

  it('shows error when name and test is not selected', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    expect(screen.getByText('Please input Name and select Test')).toBeInTheDocument();
  });

  it('shows error when name is missing', () => {
    setup('', '1' );

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    expect(screen.getByText('Please input Name')).toBeInTheDocument();
  });

  it('shows error when test is not selected', () => {
    setup('Maris');

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    expect(screen.getByText('Please select Test')).toBeInTheDocument();
  });

  it('calls setSelectedTestKey when a dropdown option selected', async () => {
    setup();

    const dropdown = screen.getByRole('button', { name: 'Select an option' });
    fireEvent.click(dropdown);

    const mathOption = screen.getByText('Test with 3 questions');
    await act(async () => {
        fireEvent.click(mathOption);
   });

    expect(mockSetSelectedTestKey).toHaveBeenCalledWith('1');
  });

  it('navigates to /questions view on button click', () => {
    setup('Maris', '1');

    const startButton = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);

    expect(mockNavigate).toHaveBeenCalledWith('/questions');
  });
});
