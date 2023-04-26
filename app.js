'use strict';

// Hide/unhide corresponding section
const navLinks = document.querySelectorAll('#menu a');

const handleNavClick = (link) => {
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
};

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
      // TODO: Move to separate function createBook()
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

      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'buttons';

      const deleteBtn = document.createElement('input');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn btn-delete';
      deleteBtn.value = 'Delete';

      const editBtn = document.createElement('input');
      editBtn.type = 'button';
      editBtn.className = 'btn btn-edit';
      editBtn.value = 'Edit';

      bookDiv.appendChild(coverPicture);
      bookDiv.appendChild(title);
      bookDiv.appendChild(language);
      bookDiv.appendChild(author);

      bookDiv.appendChild(buttonsDiv);

      buttonsDiv.appendChild(deleteBtn);
      buttonsDiv.appendChild(editBtn);

      booksContainer.appendChild(bookDiv);
      bookDiv.appendChild(buttonsDiv);
    });
  });

const form = document.getElementById('add-book-form');

const addBook = (e) => {
  e.preventDefault();

  const titleInput = document.getElementById('title-input');
  const authorInput = document.getElementById('author-input');
  const languageInput = document.getElementById('language-input');
  const coverInput = document.getElementById('cover-input');

  fetch('http://my-json-server.typicode.com/yulsmir/test-server/books', {
    method: 'POST',
    body: JSON.stringify({
      title: titleInput.value,
      author: authorInput.value,
      language: languageInput.value,
      cover: coverInput.value,
    }),

    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const booksList = document.querySelector('.book-list');

      // TODO: Fix ans use separate function createBook()
      const newBookDiv = document.createElement('div');
      newBookDiv.className = 'book';

      const coverPicture = document.createElement('picture');
      coverPicture.className = 'cover';

      const coverImage = document.createElement('img');
      coverImage.src = json.cover;
      coverPicture.appendChild(coverImage);

      const title = document.createElement('p');
      title.textContent = `Title: ${json.title}`;

      const language = document.createElement('p');
      language.textContent = `Language: ${json.language}`;

      const author = document.createElement('p');
      author.textContent = `Author: ${json.author}`;

      const checkPageBtn = document.createElement('input');
      checkPageBtn.type = 'button';
      checkPageBtn.className = 'btn btn-round';
      checkPageBtn.value = 'Check page';

      newBookDiv.appendChild(coverPicture);
      newBookDiv.appendChild(title);
      newBookDiv.appendChild(language);
      newBookDiv.appendChild(author);
      newBookDiv.appendChild(checkPageBtn);

      booksList.appendChild(newBookDiv);
    });
};

form.addEventListener('submit', addBook);
