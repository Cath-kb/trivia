function render(state, document) {

    document.getElementById('sumTotal').innerText = state.totalQuestions;
    document.getElementById('sumCorrect').innerText = state.correctAnswers;
    document.getElementById('qId').innerText = state.currentQuestion.id;
    document.getElementById('qCat').innerText = state.currentQuestion.category.title;
    document.getElementById('qText').innerText = state.currentQuestion.question;
    
    var formattedAnswer = state.currentQuestion.answer.replace(/\u003C\/?(\w)+\u003E/g, '');
    var randomLettersArr = formattedAnswer.split('').sort(function() { return 0.5 - Math.random() });
    console.log('answer: ', formattedAnswer, 'randomLettersArr: ', randomLettersArr);
    
    const templateFragment = document.getElementById('template').content;
    
    appendFragment(state.availableLetters, 'ansLetters', templateFragment);
    appendFragment(state.currentAnswer, 'ansArea', templateFragment);

    function appendFragment(str, nodeId, template) {
        var node = document.getElementById(nodeId);
        for (var i = 0; i < str.length; i++) {
            const fragment = template.cloneNode(true);
            fragment.firstChild.textContent = str[i];
            node.appendChild(fragment);
        }
    }

}