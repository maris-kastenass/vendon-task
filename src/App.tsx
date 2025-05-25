import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Questions from './pages/Questions';
import Result from './pages/Result';
import { useState, useEffect } from 'react';
import { getAllTests } from './utils/dataLoadHelper';
import { useNavigate } from 'react-router-dom';
import './App.css';

import type { Test, TestResults } from './types/tests';

function App() {
  const [name, setName] = useState<string>('');
  const [allTests, setAllTests] = useState<Test[]>([]);
  const [selectedTestKey, setSelectedTestKey] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResults[]>([]);

  const navigate = useNavigate();

  // Get all available tests
  useEffect(() => {
    const data = getAllTests();
    setAllTests(data);
  }, []);

  // Find Client selected test
  const selectedTest: Test | null =
    allTests.find((test) => test.key === selectedTestKey) || null;

  // Resets tests, where client again put name and choise test and navigate to homepage
  const resetAll = () => {
    setName('');
    setSelectedTestKey(null);
    navigate('/homepage')
  };

  // Saves all Test results in State and go to Result view
  const saveFinalResult = (answeredQuestionCount: number, correctAnsweredQuestionCount: number) => {
    // function adds Test results to array
    const newResult: TestResults = {
      name,
      testKey: selectedTestKey,
      answeredQuestionCount,
      correctAnsweredQuestionCount,
    };

    // Use functional update to ensure the latest state is used
    setTestResults(prevResults => [...prevResults, newResult]);

    // finally go to result page
    navigate('/result')
  };

  // Filter Client test Results because in Result view need show only active Client results for active Test
  const clientResults: TestResults | null = 
    testResults.find((oneResult) => oneResult.name === name && oneResult.testKey === selectedTestKey) || null;

  return (
    <Routes>
      <Route path="/" element={
        <Homepage 
          name={name} 
          onNameChange={setName} 
          selectedTestKey={selectedTestKey} 
          setSelectedTestKey={setSelectedTestKey} 
          allTests={allTests}
        />
      } />
      <Route path="/homepage" element={
        <Homepage 
          name={name} 
          onNameChange={setName} 
          selectedTestKey={selectedTestKey} 
          setSelectedTestKey={setSelectedTestKey} 
          allTests={allTests}
        />
      } />
      <Route path="/questions" element={
        <Questions 
          selectedTest={selectedTest} 
          name={name} 
          selectedTestKey={selectedTestKey} 
          saveFinalResult={saveFinalResult}
        />
      } />
      <Route path="/result" element={
        <Result 
          clientResults={clientResults} 
          resetAll={resetAll}
        />
      } />
    </Routes>
  );
}

export default App;

