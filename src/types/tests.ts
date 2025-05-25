/*
 * Type for questions main value with question itself and answers and corect answer
 * used for Question view to show question and get answer from client
 */
export type Question = {
    question: string;
    corectAnswer: string;
    answers: string[];
};

/*
 * Type for test main value with test name
 * used for test choise dropdown
 */
export type Test = {
    key: string;
    title: string;
    questions: Question[];
};

/*
 * Type for results
 * here saves client name, choisen test key, 
 * question what is answered, is answer correct and client answer
 */
export type Results = {
    name: string;
    testKey: string | null;
    question: string;
    isAnswerCorect: boolean;
    answer: string;
}

/*
 * Type for final results
 * here saves client name, choisen test key, 
 * question count what is answered, is answer count that is correct
 */
export type TestResults = {
    name: string;
    testKey: string | null;
    answeredQuestionCount: number;
    correctAnsweredQuestionCount: number;
}
