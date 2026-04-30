const navbar = document.querySelector('nav');

const items = navbar.querySelectorAll('.mid li');

items.forEach(li => {
    const url = li.getAttribute('data-url');
    li.addEventListener('click', (e) => {
        window.location.href = url;
    })
});