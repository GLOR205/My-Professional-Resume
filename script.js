const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('header nav ul');

navToggle.addEventListener('click', () => {
navMenu.classList.toggle('active');
});