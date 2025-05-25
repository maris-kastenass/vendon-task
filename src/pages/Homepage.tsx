import React from 'react';
import { Form, InputGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

import type { Test } from '../types/tests';

interface HomepageProps {
    name: string;
    onNameChange: (name: string) => void;
    selectedTestKey: string | null;
    setSelectedTestKey: (test: string | null) => void;
    allTests: Test[];
}

const Homepage: React.FC<HomepageProps> = ({ name, onNameChange, selectedTestKey, setSelectedTestKey, allTests }) => {
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  const handleClick = () => {
    navigate('/questions')
  };

  const handleSelect = (eventKey: string | null) => {
    setSelectedTestKey(eventKey);
  };

  const selectedLabel =
    allTests.find((test) => test.key === selectedTestKey)?.title || 'Select an option';

  return (
    <div className='container'>
      <div className="homepage-container p-4">
        <h1>Test Task</h1>
        <div>
          <InputGroup className="mb-3 mt-3 shadow homepage-input">
            <Form.Control
              type="text"
              placeholder="Enter your name."
              value={name}
              onChange={handleInputChange}
            />
          </InputGroup>
          <DropdownButton
            variant="outline-success"
            title={selectedLabel}
            onSelect={handleSelect}
            id="dropdown-button"
            className="w-100 homepage-dropdown"
          >
            {allTests.map((test) => (
              <Dropdown.Item eventKey={test.key} key={test.key}>
                {test.title}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <div className="homepage-button mt-3 m-auto">
            <Button 
              variant="success" 
              className="w-100" 
              // can't start while not input name and choise one from tests
              disabled={!name || !selectedTestKey} 
              onClick={handleClick}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
