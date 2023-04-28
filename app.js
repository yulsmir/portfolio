'use strict';

const API_KEY = 'zcuImMdmPyoxPNSDNOMtKGgqgMLgsiOcDDI07ZF6vM8Fhr4yPzPXoXyWYQ8';
const SPREADSHEET_ID = '1lRgXZU2qt09r5sfQUSZUIR4OP5OkVIi5BOxWtPysfRA';
const TAB_NAME = 'BookItems';
const url = new URL(`https://api.sheetson.com/v2/sheets/${TAB_NAME}`);

const params = {
  apiKey: API_KEY,
  spreadsheetId: SPREADSHEET_ID,
};

// Hide/unhide corresponding section depending on current nav item
const navLinks = document.querySelectorAll('#menu a');

const handleNavClick = (link) => {
  const sectionId = link.getAttribute('href');
  const section = document.querySelector(sectionId);
  if (section) {
    const sections = document.querySelectorAll('main section');

    sections.forEach((s) => {
      if (s !== section) {
        s.classList.add('hidden');
      }
    });

    section.classList.remove('hidden');

    const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}${sectionId}`;
    history.pushState({}, null, url);
  }
};

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    handleNavClick(link);
  });
});

const createButtons = () => {
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'buttons';

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn btn-delete';
  deleteBtn.value = 'Delete';

  deleteBtn.addEventListener('click', (e) => {
    const selectedBook = e.target.closest('.book');
    deleteBook(selectedBook.id);
    selectedBook.remove();
  });

  const editBtn = document.createElement('input');
  editBtn.type = 'button';
  editBtn.className = 'btn btn-edit';
  editBtn.value = 'Edit';

  buttonsDiv.appendChild(deleteBtn);
  buttonsDiv.appendChild(editBtn);

  return buttonsDiv;
};

const createBook = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.className = 'book';

  const coverPicture = document.createElement('picture');
  coverPicture.className = 'cover';

  const coverImage = document.createElement('img');
  coverImage.src = book.cover;
  coverPicture.appendChild(coverImage);
  coverImage.alt = book.title + '.img';

  const title = document.createElement('p');
  title.textContent = `Title: ${book.title}`;

  const language = document.createElement('p');
  language.textContent = `Language: ${book.language}`;

  const author = document.createElement('p');
  author.textContent = `Author: ${book.author}`;

  const buttonsDiv = createButtons();

  bookDiv.appendChild(coverPicture);
  bookDiv.appendChild(title);
  bookDiv.appendChild(language);
  bookDiv.appendChild(author);
  bookDiv.appendChild(buttonsDiv);

  return bookDiv;
};

// READ data - GET request
Object.keys(params).forEach((key) => url.searchParams.append(key, encodeURIComponent(params[key])));

const fetchData = () => {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const booksContainer = document.querySelector('.book-list');
      response.results.forEach((book) => {
        // console.log(book);
        const bookDiv = createBook(book);
        bookDiv.id = book.rowIndex;
        booksContainer.appendChild(bookDiv);
      });
    });
};

const form = document.getElementById('add-book-form');

// Create data - POST request
const addBookFromForm = (e) => {
  e.preventDefault();

  const titleInput = document.getElementById('title-input');
  const authorInput = document.getElementById('author-input');
  const languageInput = document.getElementById('language-input');
  const coverInput = document.getElementById('cover-input');

  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'X-Spreadsheet-Id': SPREADSHEET_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: titleInput.value,
      language: languageInput.value,
      author: authorInput.value,
      cover: coverInput.value,
    }),
  })
    .then((r) => r.json())
    .then((response) => {
      console.log(response);
      // console.log(json);
      const booksList = document.querySelector('.book-list');
      const newBook = createBook(response);
      booksList.appendChild(newBook);
    });
};

form.addEventListener('submit', addBookFromForm);

// Update data - PUT request

// fetch(`https://api.sheetson.com/v2/sheets/${TAB_NAME}/5`, {
//   method: 'PUT',
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     'X-Spreadsheet-Id': SPREADSHEET_ID,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ description: 'ololo' }),
// })
//   .then((r) => r.json())
//   .then((result) => console.log(result));

// Delete data - DELETE request
const deleteBook = (bookId) => {
  fetch(`https://api.sheetson.com/v2/sheets/${TAB_NAME}/${bookId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'X-Spreadsheet-Id': SPREADSHEET_ID,
    },
  })
    .then((r) => {
      console.log(r);
      r.json();
    })
    .then((result) => console.log(result));
};

fetchData();
