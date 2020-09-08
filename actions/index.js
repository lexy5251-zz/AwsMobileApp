export const setUserChoiceForCurrentPractice = (questionId, choiceText) => {
    return {
        type: 'SET_USER_CHOICE_FOR_CURRENT_PRACTICE',
        questionId,
        choiceText
    }
};

export const startCurrentPractice = (questions, startTimeMs) => {
    return {
        type: 'START_CURRENT_PRACTICE',
        questions,
        startTimeMs
    }
};

export const setUserChoiceForCurrentTest = (questionId, choiceText) => { 
    return {
        type: 'SET_USER_CHOICE_FOR_CURRENT_TEST',
        questionId,
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