'use strict';

const container = document.querySelector('.container');

document.querySelectorAll('.project').forEach((project) => {
  project.addEventListener('click', () => {
    // Set container div to white
    // container.style.backgroundColor = '#fff';
    container.innerHTML = 'Hohoh';
  });
});
