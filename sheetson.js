// const API_KEY = 'zcuImMdmPyoxPNSDNOMtKGgqgMLgsiOcDDI07ZF6vM8Fhr4yPzPXoXyWYQ8';
// const SPREADSHEET_ID = '1lRgXZU2qt09r5sfQUSZUIR4OP5OkVIi5BOxWtPysfRA';
// const TAB_NAME = 'BookItems';

// const fetch = require('isomorphic-fetch');
// fetch(`https://api.sheetson.com/v2/sheets/${TAB_NAME}`, {
//   method: 'POST',
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     'X-Spreadsheet-Id': SPREADSHEET_ID,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     title: 'Book',
//     language: 'French',
//     author: 'John Doe',
//     cover: 'https://images.unsplash.com/photo-1680234260561-383bb6705468',
//   }),
// })
//   .then((r) => r.json())
//   .then((result) => console.log(result));

// DELETE
// const idToDelete = 11;
// fetch(`https://api.sheetson.com/v2/sheets/${TAB_NAME}/${idToDelete}`, {
//   method: 'DELETE',
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     'X-Spreadsheet-Id': SPREADSHEET_ID,
//   },
// })
//   .then((r) => {
//     console.log(r);
//     r.json();
//   })
//   .then((result) => console.log(result));

const API_KEY = 'zcuImMdmPyoxPNSDNOMtKGgqgMLgsiOcDDI07ZF6vM8Fhr4yPzPXoXyWYQ8';
const SPREADSHEET_ID = '1lRgXZU2qt09r5sfQUSZUIR4OP5OkVIi5BOxWtPysfRA';
const TAB_NAME = 'BookItems';

// READ
const params = {
  apiKey: API_KEY,
  spreadsheetId: SPREADSHEET_ID,
};
const url = new URL(`https://api.sheetson.com/v2/sheets/${TAB_NAME}`);
Object.keys(params).forEach((key) => url.searchParams.append(key, encodeURIComponent(params[key])));
fetch(url)
  .then((r) => r.json())
  .then((result) => console.log(result));
// console.log(books);

// Update
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
