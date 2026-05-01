// ==============================
// Notification JS at /js/notifications.js
// ==============================

// Sets a new enclosed enviornment and creates the styling for the notification
(() =>  {
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', './css/notification.css');
    document.querySelector('head').appendChild(style);

    const container = document.createElement('div');
    container.id = "notificationContainer";
    document.body.appendChild(container);
})()

// This creates the notification
function makeNotification(text) {
    // Creates the element
    const element = document.createElement('span');
    element.classList.add("notification");

    // Fills the element
    element.innerHTML = `
        <span class="closeBtn">&times;</span>
        <span class="noteText">${text}</span>
    `;

    // When clicking the close button it hides the notification
    element.querySelector(".closeBtn").onclick = () => {
        hideNotification(element);
    };

    return element;
}

// This shows the notification using makeNotification;
function showNotification(text) {
    const container = document.getElementById("notificationContainer");
    const note = makeNotification(text);

    container.appendChild(note);

    // Shows the notification
    setTimeout(() => {
        note.classList.add("show");
    }, 10);
    // Hides the notification automatically
    setTimeout(() => {
        hideNotification(note);
    }, 4000);
}

// Hides the notification
function hideNotification(note) {
    if (!note) return;

    // Removes the ability to see
    note.classList.remove("show");

    setTimeout(() => {
        if (note.parentNode) {
            // Completely removes the element
            note.parentNode.removeChild(note);
        }
    }, 300);
}

// Contains the alert over-rides
// ==============================
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
// ==============================