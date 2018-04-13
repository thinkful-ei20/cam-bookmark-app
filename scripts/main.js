'use strict';
/*global $, api, store, bookmarks*/

// DOM READY FUNCTION
$(() => {
  // Run handlers
  api.getBookmarks((response) => {
    response.forEach((bookmark) => store.addBookmark({
      id: bookmark.id,
      title: bookmark.title,
      url: bookmark.url,
      rating: bookmark.rating,
      desc: bookmark.desc,
      editMode: bookmark.editMode,
      expanded: false,
    }));
    bookmarks.render();
  });
  bookmarks.bindEventListeners();
});

