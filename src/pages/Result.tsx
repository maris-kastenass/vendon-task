import React from 'react';
import { Button } from 'react-bootstrap';
import './Result.css';

import type { TestResults } from '../types/tests';

interface ResultProps {
  clientResults: TestResults | null;
  resetAll: () => void;
}

const Result: React.FC<ResultProps> = ({ clientResults, resetAll }) => {
  return (
    <div className="container">
      <div className="result-container p-4">
        {clientResults ?
          <div>
            <h1>Thank You, {clientResults.name || 'sir'}!</h1>
            <h4>You answered correctly on {clientResults.correctAnsweredQuestionCount} out of {clientResults.answeredQuestionCount} questions</h4>
          </div>
        :
          <h1>Sory cant find Your results!</h1>
        }
        <Button 
          variant="success" 
          className="mt-3" 
          onClick={resetAll}
        >
          Start Again
        </Button>
      </div>
    </div>
  );
};

export default Result;
