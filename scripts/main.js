'use strict';
/*global $, api, store, bookmarks*/

// DOM READY FUNCTION
$(() => {
  // Run handlers
  bookmarks.handleNewBookmarkSubmit();
  bookmarks.render();
  bookmarks.handleDeleteBookmarkClick();
  bookmarks.handleEditModeClick();
});

