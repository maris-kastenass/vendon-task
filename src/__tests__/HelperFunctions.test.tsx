import { completeTest } from '../utils/helperFunctions';

import type { Results } from '../types/tests';

const { expect, describe, it } = require('@jest/globals');

describe('completeTest', () => {
  const saveFinalResultMock = jest.fn();

  beforeEach(() => {
    saveFinalResultMock.mockClear();
  });

  it('should call saveFinalResult with correct result counts', () => {
    const results: Results[] = [
      { name: 'Maris', testKey: '1', question: 'How much is 2 + 2', isAnswerCorect: true, answer: '4'},
      { name: 'Maris', testKey: '1', question: 'How much is 3 + 3', isAnswerCorect: false, answer: '4'},
      { name: 'Maris', testKey: '1', question: 'How much is 4 + 4', isAnswerCorect: true, answer: '8'},
      { name: 'Janis', testKey: '1', question: 'How much is 5 + 5', isAnswerCorect: true, answer: '10'}, // different name
      { name: 'Maris', testKey: '2', question: 'How much is 6 + 6', isAnswerCorect: true, answer: '12'}, // different testKey
    ];

    completeTest(results, 'Maris', '1', saveFinalResultMock);

    // 3 matching Results for client and 2 are correct
    expect(saveFinalResultMock).toHaveBeenCalledWith(3, 2);
  });

  it('should call saveFinalResult with two 0 when no matching results', () => {
    const results: Results[] = [
      { name: 'Maris', testKey: '1', question: 'How much is 2 + 2', isAnswerCorect: true, answer: '4'},
    ];

    completeTest(results, 'Janis', '2', saveFinalResultMock);

    expect(saveFinalResultMock).toHaveBeenCalledWith(0, 0);
  });

  it('should return 0 and test count if no correct answers', () => {
    const results: Results[] = [
    { name: 'Maris', testKey: '1', question: 'How much is 2 + 2', isAnswerCorect: false, answer: '7'},
    { name: 'Maris', testKey: '1', question: 'How much is 3 + 3', isAnswerCorect: false, answer: '7'},
    ];

    completeTest(results, 'Maris', '1', saveFinalResultMock);

    expect(saveFinalResultMock).toHaveBeenCalledWith(2, 0);
  });
});
