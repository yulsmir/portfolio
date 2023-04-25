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
