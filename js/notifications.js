(() =>  {
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', './css/notification.css');
    document.querySelector('head').appendChild(style);
})()

function makeNotification(text) {
    const element = document.createElement('span');

    return element;
}

function showNotification(text) {

}

window.top.alert = (text) => {
    showNotification(text);
}

window.alert = (text) => {
    showNotification(text);
}

window.document.alert = (text) => {
    showNotification(text);
}

window.document.body.alert = (text) => {
    showNotification(text);
}

alert = (text) => {
    showNotification(text);
}