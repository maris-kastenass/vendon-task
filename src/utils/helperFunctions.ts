import type { Results } from '../types/tests';

export const completeTest = (
    results: Results[], 
    name: string, 
    testKey: string | null, 
    saveFinalResult: (answeredQuestionCount: number, correctAnsweredQuestionCount: number) => void
) => {
  // Filter Client Results because in Result view need show only active Client results for active Test
  const clientResults = results.filter(r => r.name === name && r.testKey === testKey);
  // all answer count
  const answeredQuestionCount = clientResults.length;
  // filter only correct answers
  const correctAnsweredQuestionCount = clientResults.filter(r => r.isAnswerCorect).length;
  // send test results and open Result view
  saveFinalResult(answeredQuestionCount, correctAnsweredQuestionCount);
};
