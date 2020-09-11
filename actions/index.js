export const setUserChoiceForCurrentPractice = (questionIndex, choiceText) => {
    return {
        type: 'SET_USER_CHOICE_FOR_CURRENT_PRACTICE',
        questionIndex,
        choiceText
    }
};

export const startCurrentPractice = (questions, startTimeMs) => {
    return {
        type: 'START_CURRENT_PRACTICE',
        questions,
        startTimeMs,
    }
};

export const setCurrentQuestionIndex = (questionIndex) => {
    return {
        type: 'SET_CURRENT_QUESTION_INDEX',
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

export const startCurrentTest = (questions, startTimeMs) => {
    return {
        type: 'START_CURRENT_TEST',
        questions,
        startTimeMs
    }
};