export const setUserChoiceForCurrentPractice = (questionIndex, choiceText) => {
    return {
        type: 'SET_USER_CHOICE_FOR_CURRENT_PRACTICE',
        questionIndex,
        choiceText
    }
};

export const startCurrentPractice = (questions) => {
    return {
        type: 'START_CURRENT_PRACTICE',
        questions,
    }
};

export const endCurrentPractice = () => {
    return {
        type: 'END_CURRENT_PRACTICE',
    }
};

export const setCurrentPracticeQuestionIndex = (questionIndex) => {
    return {
        type: 'SET_CURRENT_PRACTICE_QUESTION_INDEX',
        questionIndex,
    }
}

export const setUserChoiceForCurrentTest = (questionIndex, choiceText) => { 
    return {
        type: 'SET_USER_CHOICE_FOR_CURRENT_TEST',
        questionIndex,
        choiceText
    }
};

export const startCurrentTest = (questions) => {
    return {
        type: 'START_CURRENT_TEST',
        questions,
    }
};

export const endCurrentTest = () => {
    return {
        type: 'END_CURRENT_TEST',
    }
};

export const setCurrentTestQuestionIndex = (questionIndex) => {
    return {
        type: 'SET_CURRENT_TEST_QUESTION_INDEX',
        questionIndex,
    }
}