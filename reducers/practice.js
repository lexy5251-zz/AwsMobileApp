const currentPractice = (state = {}, action) => {
    switch(action.type) {
        case 'SET_USER_CHOICE_FOR_CURRENT_PRACTICE':
            let { questionIndex, choiceText } = action;
            if(state.questions && questionIndex && state.questions[questionIndex]) {
                let questions = [...state.questions];
                questions[questionIndex].choiceText = choiceText;
                state.questions = questions;
                return {...state};
            }
        case 'START_CURRENT_PRACTICE':
            let { questions, startTimeMs } = action;
            if(questions && startTimeMs) {
                state = {questions, startTimeMs, currentQuestionIndex:0};
                return {...state};
            }
        case 'SET_CURRENT_QUESTION_INDEX':
            questionIndex = action.questionIndex;
            if(state.questions && questionIndex && state.questions[questionIndex]) {
                state.currentQuestionIndex = questionIndex;
                return {...state};
            }
        default: 
        return state;
    }

}

export default currentPractice;