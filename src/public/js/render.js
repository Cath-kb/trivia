function render(state, document) {

    document.getElementById('sumTotal').innerText = state.totalQuestions;
    document.getElementById('sumCorrect').innerText = state.correctAnswers;
    document.getElementById('qId').innerText = state.currentQuestion.id || 'NA';
    document.getElementById('qCat').innerText = state.currentQuestion.category;
    document.getElementById('qText').innerText = state.currentQuestion.question;
    
    const templateFragment = document.getElementById('template').content;
    
    appendFragment(state.availableLetters, 'ansLetters', templateFragment, !isAnswerCorrect(state));
    appendFragment(state.currentAnswer, 'ansArea', templateFragment, !isAnswerCorrect(state));

    const result = document.getElementById('result');
    const skip = document.getElementById('skip');
    const nextQuestion = document.getElementById('nextQuestion');
    const chooseService = document.getElementById('chooseService');

    result.classList.remove('success');
    result.classList.remove('error');
    skip.style.display = 'block';
    nextQuestion.style.display = 'none';
    skip.onclick = nextQuestion.onclick = getQuestionHandler;
    chooseService.onchange = onSwitchAdapterClick;
    
    if (isAnswerFulfilled(state)) {
        if (isAnswerCorrect(state)) {
            result.classList.add('success');
            result.innerText = 'Correct';
            skip.style.display = 'none';
            nextQuestion.style.display = 'block';
        } else {
            result.classList.add('error');
            result.innerText = 'Incorrect';
        }
    }

    function appendFragment(str, nodeId, template, handleOnClick) {
        var node = document.getElementById(nodeId);
        node.innerHTML = '';
        for (let i = 0; i < str.length; i++) {
            const fragment = template.cloneNode(true);
            fragment.firstChild.textContent = str[i].replace(' ', '\u00A0');
            if (handleOnClick) {
                fragment.firstChild.onclick = onLetterClick.bind(null, nodeId, i);
            }
            node.appendChild(fragment);
        }
    }

}

function onLetterClick(node, index) {
    switch (node) {
        case 'ansArea':
            moveLetterToLetters(state, index);
            break;
        case 'ansLetters':
            moveLetterToAnswer(state, index);
            break;
    }
    render(state, document);
}

function getQuestionHandler() {
    getQuestion(state);
    render(state, document);
}

function onSwitchAdapterClick(e) {
    if (e.target.value !== state.sourceAdapter) {
        state.sourceAdapter = e.target.value;
        getQuestion(state);
        render(state, document);
    }
}