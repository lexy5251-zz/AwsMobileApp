const currentTest = (state = {}, action) => {
    switch(action.type) {
        case 'SET_USER_CHOICE_FOR_CURRENT_TEST':
            let { questionIndex, choiceText } = action;
            if(state.questions && action.questionIndex && state.questions[questionIndex]) {
                let questions = {...state.questions};
                questions[questionIndex].choiceText = choiceText;
                state.questions = questions;
                return {...state};
            }
        case 'START_CURRENT_TEST':
            let {questions, startTimeMs} = action;
            if(questions && startTimeMs) {
                state = {questions, startTimeMs};
                return {...state};
            }
        default: return state;
    }
}

export default currentTest;