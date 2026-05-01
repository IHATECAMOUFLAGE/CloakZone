// =================
// navbar.js at /js/navbar.js
// =================

// Defining variabels
const navbar = document.querySelector('nav');
const items = navbar.querySelectorAll('.mid li');

// Makes the links work
items.forEach(li => {
    const url = li.getAttribute('data-url');
    li.addEventListener('click', (e) => {
        window.location.href = url;
    })
});