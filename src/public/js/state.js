const state = {
    totalQuestions: 0,
    correctAnswers: 0,
    currentQuestion: {},
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

function correctAnswer(state) {
    return state.currentQuestion.answer.replace(/\u003C\/?(\w)+\u003E/g, '')
}

function isAnswerCorrect(state) {
    return state.currentAnswer === correctAnswer(state);
}

function isAnswerFulfilled(state) {
    return state.availableLetters === '';
}

function getQuestion(state) {
    const data = getData();
    state.currentQuestion = data;
    state.currentAnswer = '';
    state.totalQuestions++;
    const formattedAnswer = correctAnswer(state);
    console.log('answer: ', formattedAnswer);
    state.availableLetters = formattedAnswer.split('').sort(function() { return 0.5 - Math.random() }).join('');
}