const currentTest = (state = {}, action) => {
    switch(action.type) {
        case 'SET_USER_CHOICE_FOR_CURRENT_TEST':
            let { questionIndex, choiceText } = action;
            if(state.questions && questionIndex != undefined && state.questions[questionIndex]) {
                let questions = [...state.questions];
                questions[questionIndex].choiceText = choiceText;
                state.questions = questions;
                return {...state};
            }
        case 'START_CURRENT_TEST':
            let { questions } = action;
            if(questions) {
                state = {questions, startTime: Date.now()};
                return {...state};
            }
        case 'END_CURRENT_TEST':
            let now = Date.now();
            state.endTime = Date.now();
            if(state.currentQuestionIndex != undefined && state.questions[state.currentQuestionIndex]) {
                state.questions[state.currentQuestionIndex].endTime = now;
            }
            return {...state};
        case 'SET_CURRENT_TEST_QUESTION_INDEX':
            questionIndex = action.questionIndex;
            now = Date.now();
            if(state.questions && questionIndex != undefined && state.questions[questionIndex]) {
                if (state.currentQuestionIndex != undefined) {
                    let pre = state.questions[state.currentQuestionIndex];
                    pre.endTime = now;
                }
                state.currentQuestionIndex = questionIndex;
                let q = state.questions[questionIndex];
                q.startTime = now;
                return {...state};
            }
        default: 
        return state;
    }
}

export default currentTest;