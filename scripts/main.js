'use strict';
/*global $, api, store, bookmarks*/

// DOM READY FUNCTION
$(() => {
  // Run handlers
  bookmarks.handleNewBookmarkSubmit();
});

// POST TEST
// api.createBookmark({title: 'bookmarkTest2', url: 'https://www.google.com'}, (newBookmark) => {
//   api.getBookmarks((bookmarks) => {
//     console.log(newBookmark);  
//   });
// });

// api.getBookmarks((bookmarks) => {
//   store.bookmarks.forEach((bookmark) => console.log(bookmark));
// });
