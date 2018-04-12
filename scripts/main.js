'use strict';
/*global $, api, store, bookmarks*/

// DOM READY FUNCTION
$(() => {
  // Run handlers
  bookmarks.handleNewBookmarkSubmit();
  // bookmarks.render();
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

// PATCH TEST
// api.getBookmarks((bookmarks) => {
//   const bookmark = bookmarks[0];

//   api.updateBookmark(bookmark.id, {title: "hahaCats"}, () => {
//     console.log('Updated bookmark[0]');
//     console.log(store.bookmarks);
//   });
// });
