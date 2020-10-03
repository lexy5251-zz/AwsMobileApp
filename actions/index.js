import {getData, storeData} from '../data'

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

export const setCurrentPractice = (currentPractice) => {
    return {
        type: 'SET_CURRENT_PRACTICE',
        currentPractice,
    }
};

export const saveCurrentPractice = () => async (dispatch, getState) => {
    let {currentPractice} = getState();
    await storeData('@currentPractice', currentPractice);
};

export const restoreCurrentPractice =  () => async (dispatch, getState) => {
    let savedPractice = await getData('@currentPractice');
    if (savedPractice) {
        dispatch(setCurrentPractice(savedPractice));
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

export const setCurrentTest = (currentTest) => {
    return {
        type: 'SET_CURRENT_TEST',
        currentTest,
    }
};

export const saveCurrentTest = () => async (dispatch, getState) => {
    let {currentTest} = getState();
    await storeData('@currentTest', currentTest);
};

export const restoreCurrentTest =  () => async (dispatch, getState) => {
    let savedTest = await getData('@currentTest');
    if (savedTest) {
        dispatch(setCurrentTest(savedTest));
    }
};

export const setCurrentTestQuestionIndex = (questionIndex) => {
    return {
        type: 'SET_CURRENT_TEST_QUESTION_INDEX',
        questionIndex,
    }
}