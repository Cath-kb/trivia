const state = {
    totalQuestions: 0,
    correctAnswers: 0,
    currentQuestion: {
        id: null,
        category: '',
        question: '',
        answer: ''
    },
    currentAnswer: '',
    availableLetters: ''
};

function moveLetterToAnswer(state, index) {
    const letters = state.availableLetters.split('');
    state.currentAnswer = state.currentAnswer.concat(letters.splice(index, 1)[0]);
    state.availableLetters = letters.join('');
    if (isAnswerCorrect(state)) {
        state.correctAnswers++;
    }
}

function moveLetterToLetters(state, index) {
    const letters = state.currentAnswer.split('');
    state.availableLetters = state.availableLetters.concat(letters.splice(index, 1)[0]);
    state.currentAnswer = letters.join('');
}

function isAnswerCorrect(state) {
    return state.currentAnswer === state.currentQuestion.answer;
}

function isAnswerFulfilled(state) {
    return state.availableLetters === '';
}

function getQuestion(state) {
    state.currentQuestion = getOpentdbQuestion();
    state.currentAnswer = '';
    state.totalQuestions++;
    const answer = state.currentQuestion.answer;
    console.log('answer: ', answer);
    state.availableLetters = answer.split('').sort(function() { return 0.5 - Math.random() }).join('');
}