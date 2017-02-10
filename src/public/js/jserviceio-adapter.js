
function getJsonFromURL(url) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        return xhr.responseText;
    }
}

function getData() {
    const url = 'https://jservice.io/api/random';
    const json = getJsonFromURL(url);
    const data = JSON.parse(json);
    return data[0];
}