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
    availableLetters: '',
    sourceAdapter: 'opentdb'
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

function getAdapter(state) {
    let adapter;
    switch (state.sourceAdapter) {
        case 'opentdb':
            adapter = getOpentdbQuestion;
            break;
        case 'jservice':
            adapter = getJServiceQuestion;
            break;
    }
    return adapter;
}

function getQuestion(state) {
    state.currentQuestion = getAdapter(state)();
    state.currentAnswer = '';
    state.totalQuestions++;
    const answer = state.currentQuestion.answer;
    console.log('answer: ', answer);
    state.availableLetters = answer.split('').sort(function() { return 0.5 - Math.random() }).join('');
}