'use strict';

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

// Get all books
fetch('http://my-json-server.typicode.com/yulsmir/test-server/books')
  .then((response) => response.json())
  .then((books) => {
    const booksContainer = document.querySelector('.book-list');
    books.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';

      const coverPicture = document.createElement('picture');
      coverPicture.className = 'cover';

      const coverImage = document.createElement('img');
      coverImage.src = book.cover;
      coverPicture.appendChild(coverImage);

      const title = document.createElement('p');
      title.textContent = `Title: ${book.title}`;

      const language = document.createElement('p');
      language.textContent = `Language: ${book.language}`;

      const author = document.createElement('p');
      author.textContent = `Author: ${book.author}`;

      const checkPageBtn = document.createElement('input');
      checkPageBtn.type = 'button';
      checkPageBtn.className = 'btn btn-round';
      checkPageBtn.value = 'Check page';

      bookDiv.appendChild(coverPicture);
      bookDiv.appendChild(title);
      bookDiv.appendChild(language);
      bookDiv.appendChild(author);
      bookDiv.appendChild(checkPageBtn);

      booksContainer.appendChild(bookDiv);
    });
  });

// Create a new book
// const newBook = {
//   title: 'New Book Title',
//   author: 'New Book Author',
//   language: 'New Language',
// };

// // Function to add a new book to the server and update the book list
// const bookList = document.querySelector('.book-list');
// const addBookForm = document.getElementById('add-book-form');

// // Function to display the list of books on the page
// function displayBooks(books) {
//   bookList.innerHTML = '';
//   books.forEach((book) => {
//     const bookDiv = document.createElement('div');
//     bookDiv.className = 'book';
//     const coverPicture = document.createElement('picture');
//     coverPicture.className = 'cover';

//     const coverImage = document.createElement('img');
//     coverImage.src = book.cover;
//     coverPicture.appendChild(coverImage);

//     const title = document.createElement('h3');
//     title.textContent = book.title;

//     const author = document.createElement('p');
//     author.textContent = book.author;

//     const language = document.createElement('p');
//     author.textContent = book.language;

//     bookDiv.appendChild(coverPicture);
//     bookDiv.appendChild(title);
//     bookDiv.appendChild(author);
//     bookDiv.appendChild(language);

//     bookList.appendChild(bookDiv);
//   });
// }

// Function to add a new book to the server and update the book list
// function addBook(event) {
//   event.preventDefault();

//   const titleInput = document.getElementById('title-input');
//   const authorInput = document.getElementById('author-input');
//   const languageInput = document.getElementById('language-input');

//   const newBook = {
//     title: titleInput.value,
//     author: authorInput.value,
//     language: languageInput.value,
//   };

//   fetch('http://my-json-server.typicode.com/yulsmir/test-server/books', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newBook),
//   })
//     .then((response) => response.json())
//     .then((books) => {
//       displayBooks(books);
//       titleInput.value = '';
//       authorInput.value = '';
//       languageInput.value = '';
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }

// Attach event listener to the form submit button
// addBookForm.addEventListener('submit', addBook);

const form = document.getElementById('add-book-form');

const addBook = (e) => {
  e.preventDefault();

  const titleInput = document.getElementById('title-input');
  const authorInput = document.getElementById('author-input');
  const languageInput = document.getElementById('language-input');

  fetch('http://my-json-server.typicode.com/yulsmir/test-server/books', {
    method: 'POST',
    body: JSON.stringify({
      title: titleInput.value,
      author: authorInput.value,
      language: languageInput.value,
    }),

    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': '2592000',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const booksList = document.querySelector('.book-list');

      booksList.innerHTML = `Title: ${json.title}, author: ${json.author}, language: ${json.language}`;
    });
};

form.addEventListener('submit', addBook);
