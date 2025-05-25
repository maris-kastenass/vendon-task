const QUESTION_1 = { 
    question: 'How much is 2 + 2', 
    corectAnswer: '4', 
    answers: ['5', '9', '4', '1', '7', '10', '22', '24', '44', '0', '3', '8', '6']
}
const QUESTION_2 = { 
    question: 'How much is 3 + 3', 
    corectAnswer: '6', 
    answers: ['5', '6', '7', '9']
}
const QUESTION_3 = { 
    question: 'How much is 4 + 4', 
    corectAnswer: '8', 
    answers: ['5', '9', '4', '1', '7', '10', '22', '24', '0', '3', '8', '6']
}
const QUESTION_4 = { 
    question: 'How much is 5 + 5', 
    corectAnswer: '10', 
    answers: ['5', '9', '4', '1', '7', '10', '22', '24', '0', '3', '8', '6', '100', '77']
}
const QUESTION_5 = { 
    question: 'How much is 6 + 6', 
    corectAnswer: '12', 
    answers: ['5', '9', '12']
}
const QUESTION_6 = { 
    question: 'How much is 7 + 7', 
    corectAnswer: '14', 
    answers: ['5', '9', '4', '14', '7', '10', '22']
}

export const ALL_TESTS = [
    {
        key: '1',
        title: 'Test with 3 questions',
        questions: [
            QUESTION_1,
            QUESTION_2,
            QUESTION_3,
        ]
    },
    {
        key: '2',
        title: 'Test with 4 questions',
        questions: [
            QUESTION_1,
            QUESTION_2,
            QUESTION_3,
            QUESTION_4,
        ]
    },
    {
        key: '3',
        title: 'Test with 5 questions',
        questions: [
            QUESTION_1,
            QUESTION_2,
            QUESTION_3,
            QUESTION_4,
            QUESTION_5,
        ]
    },
    {
        key: '4',
        title: 'Test with 6 questions',
        questions: [
            QUESTION_1,
            QUESTION_2,
            QUESTION_3,
            QUESTION_4,
            QUESTION_5,
            QUESTION_6,
        ]
    },
]