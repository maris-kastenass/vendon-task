import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import ProgressBarComponent from '../components/ProgressBarComponent';
import { completeTest } from '../utils/helperFunctions'
import './Questions.css';

import type { Test, Question, Results } from '../types/tests';

interface QuestionsProps {
    selectedTest: Test | null;
    name: string;
    selectedTestKey: string | null;
    saveFinalResult: (answeredQuestionCount: number, correctAnsweredQuestionCount: number) => void;
}

const Questions: React.FC<QuestionsProps> = ({ selectedTest, name, selectedTestKey, saveFinalResult }) => {
  const [activeQuestionNr, setActiveQuestion] = useState<number>(0);
  const [results, setResults] = useState<Results[]>([]);

  // after adding results
  useEffect(() => {
    // if last question then go to results
    if (activeQuestionNr === allQuestions.length) {
      completeTest(results, name, selectedTestKey, saveFinalResult);
    }
  }, [results]);

  // get all questions for selected test
  const allQuestions: Question[] = selectedTest?.questions || [];

  // active question text
  const questionText =
    allQuestions[activeQuestionNr]?.question || 'Question not found';

  // active question answers
  const answers =
    allQuestions[activeQuestionNr]?.answers || [];

  // total question count for selected test
  const questionCount = allQuestions?.length || 0;

  // save results and switch to next question or result view
  const handleAnswer = (answer: string) => {
    const corectAnswer =
      allQuestions[activeQuestionNr]?.corectAnswer || null;

    // check if answer is correct
    const isAnswerCorect = answer === corectAnswer;

    // set next question
    setActiveQuestion(activeQuestionNr + 1);

    // save answer
    addResult(questionText, isAnswerCorect, answer);
  };

  // function adds results to array
  const addResult = (question: string, isAnswerCorect: boolean, answer: string) => {
    const newResult: Results = {
      name,
      testKey: selectedTestKey,
      question, 
      isAnswerCorect, 
      answer
    };

    // Use functional update to ensure the latest state is used
    setResults(prevResults => [...prevResults, newResult]);
  };

  return (
    <div className="container">
      <div className="questions-container m-auto p-4">
        <h1>{ questionText }</h1>
        <Row xs={1} sm={2}>
          {answers.map((answer, index) => (
            <Col key={index}>
              <Button 
                variant="success" 
                size="lg"
                className="w-100 hover-scale questions-answer"
                onClick={ () => { handleAnswer(answer); }}
              >
                {answer}
              </Button>
            </Col>
          ))}
        </Row>
        <ProgressBarComponent progress={activeQuestionNr} min={0} max={questionCount} />
      </div>
    </div>
  );
};

export default Questions;
