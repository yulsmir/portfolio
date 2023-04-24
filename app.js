'use strict';

const burgerIcon = document.querySelector('.burger-icon');
const navLinks = document.querySelector('nav ul');

burgerIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
