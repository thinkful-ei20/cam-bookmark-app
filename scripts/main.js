'use strict';
/*global $*/

// DOM READY FUNCTION
$(() => {
  // Run handlers
});

// const mockObj = {
//   title: 'abcde',
//   url: 'https://www.google.com',
//   rating: 5,
// };

// // TESTING POST
// $.ajax({
//   url: 'https://thinkful-list-api.herokuapp.com/cam/bookmarks',
//   method: 'POST',
//   dataType: 'json',
//   contentType: 'application/json',
//   data: mockObj,
//   success: (response) => {
//     console.log(response);
//   },
// });
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cam';

$.getJSON(`${BASE_URL}/bookmarks`, (response) => {
  console.log('api response:', response);
});