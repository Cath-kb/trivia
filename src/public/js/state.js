const state = {
    totalQuestions: 2,
    correctAnswers: 1,
    currentQuestion: {
        "id": 77528,
        "answer": "<i>People</i>",
        "question": "The 1974 premiere issue of this celebrity magazine featured Mia Farrow in a pose from \"The Great Gatsby\"",
        "value": 200,
        "airdate": "2007-06-06T12:00:00.000Z",
        "created_at": "2014-02-11T23:37:00.498Z",
        "updated_at": "2014-02-11T23:37:00.498Z",
        "category_id": 752,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 752,
            "title": "magazines",
            "created_at": "2014-02-11T22:50:06.971Z",
            "updated_at": "2014-02-11T22:50:06.971Z",
            "clues_count": 95
        }
    },
    currentAnswer: 'Pple',
    availableLetters: 'oe'
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