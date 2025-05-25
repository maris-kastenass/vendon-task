import { render, screen, fireEvent } from '@testing-library/react';
import Questions from '../pages/Questions';
import { completeTest } from '../utils/helperFunctions';

import type { Test } from '../types/tests';

const { expect, describe, it } = require('@jest/globals');

jest.mock('../utils/helperFunctions', () => ({
  completeTest: jest.fn(),
}));

describe('Questions component', () => {
  const name = 'Maris';
  const testKey = '1';
  const test: Test = {
    key: testKey,
    title: 'Test with 2 questions',
    questions: [
      {
        question: 'How much is 6 + 6',
        corectAnswer: '12',
        answers: ['8', '12', '14'],
      },
      {
        question: 'How much is 2 + 2',
        corectAnswer: '4',
        answers: ['3', '6', '4', '9', '10'],
      },
    ],
  };

  const saveFinalResult = jest.fn();

  it('renders first question and answers', () => {
    render(
      <Questions
        selectedTest={test}
        name={name}
        selectedTestKey={testKey}
        saveFinalResult={saveFinalResult}
      />
    );

    expect(screen.getByText('How much is 6 + 6')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
  });

  it('calls completeTest after answering all questions', () => {
    render(
      <Questions
        selectedTest={test}
        name={name}
        selectedTestKey={testKey}
        saveFinalResult={saveFinalResult}
      />
    );

    // Answer correct on 1st question
    fireEvent.click(screen.getByText('12'));

    // Check question 2 title
    expect(screen.getByText('How much is 2 + 2')).toBeInTheDocument();

    // Answer 2nd question
    fireEvent.click(screen.getByText('4'));

    // need to completeTest call
    expect(completeTest).toHaveBeenCalledTimes(1);

    // Check the arguments passed to completeTest
    const [results, passName, passKey, callback] = (completeTest as jest.Mock).mock.calls[0];

    // check all passed parametrs
    expect(passName).toBe(name);
    expect(passKey).toBe(testKey);
    expect(callback).toBe(saveFinalResult);
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({
      name,
      testKey,
      question: 'How much is 6 + 6',
      isAnswerCorect: true,
      answer: '12',
    });
    expect(results[1]).toMatchObject({
      name,
      testKey,
      question: 'How much is 2 + 2',
      isAnswerCorect: true,
      answer: '4',
    });
  });
});
