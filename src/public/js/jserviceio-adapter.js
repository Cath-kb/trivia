
function getData(url) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        return JSON.parse(xhr.responseText);
    }
}

function getOpentdbQuestion() {
    const url = 'https://opentdb.com/api.php?amount=1&type=multiple';
    const data = getData(url).results[0];
    return {
        id: null,
        category: data.category,
        question: decodeHtml(data.question),
        answer: data.correct_answer
    };
}

function getJServiceQuestion() {
    const url = 'https://jservice.io/api/random';
    const data = getData(url)[0];
    return {
        id: data.id,
        category: data.category.title,
        question: data.question,
        answer: data.answer.replace(/\u003C\/?(\w)+\u003E/g, '')
    };
}