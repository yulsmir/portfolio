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

function handleNavClick(link) {
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
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    handleNavClick(link);
  });
});

// // Get all books
// fetch('http://my-json-server.typicode.com/yulsmir/project-server/books')
//   .then((response) => response.json())
//   .then((data) => {
//     // Do something with the data, like display it on your page
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

// // Create a new book
// const newBook = {
//   title: 'New Book Title',
//   author: 'New Book Author',
//   image: 'https://example.com/new-book-image.jpg',
// };

// fetch('http://my-json-server.typicode.com/yulsmir/project-server/books', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(newBook),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
