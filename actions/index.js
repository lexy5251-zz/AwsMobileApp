export const setUserChoiceForCurrentPractice = (questionId, choiceText) => {
    return {
        type: 'SET_USER_CHOICE_FOR_CURRENT_PRACTICE',
        questionId,
        choiceText
    }
};

export const startCurrentPractice = (questions) => {
    return {
        type: 'START_CURRENT_PRACTICE',
        questions
    }
};

export const setUserChoiceForCurrentTest = (questionId, choiceText) => { 
    return {
        type: 'SET_USER_CHOICE_FOR_CURRENT_TEST',
        questionId,
        choiceText
    }
};

export const startCurrentTest = (questions) => {
    return {
        type: 'START_CURRENT_TEST',
        questions
    }
};