'use strict';

const project1 = document.querySelector('.project-1');
const container = document.querySelector('.container');

const displayProject1 = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './projects/project-01.html');
  xhr.onload = function () {
    container.innerHTML = xhr.response;
  };
  xhr.send();
};

project1.addEventListener('click', displayProject1);

// Hide/unhide corresponding section
const navLinks = document.querySelectorAll('#menu a');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const sectionId = link.getAttribute('href');
    const section = document.querySelector(sectionId);

    console.log(section);

    if (section) {
      const sections = document.querySelectorAll('main section');

      sections.forEach((s) => {
        if (s !== section) {
          s.classList.add('hidden');
        }
      });
      section.classList.remove('hidden');
    }
  });
});
