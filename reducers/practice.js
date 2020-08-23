const currentPractice = (state = {}, action) => {
    switch(action.type) {
        case 'SET_USER_CHOICE_FOR_CURRENT_PRACTICE':
            let { questionId, choiceText } = action;
            if(state.questions && action.questionId && state.questions[questionId]) {
                state.questions[questionId].choiceText = choiceText;
                return {...state};
            }
        case 'START_CURRENT_PRACTICE':
            let { questions } = action;
            if(questions) {
                state = {questions};
                return {...state};
            }
        default: 
        return state;
    }

}

export default currentPractice;