'use strict';
const store = (function(){
  let createNewBookmarkMode = false; // false = simple view of bookmarks, true = form view, which leads to submit event
  let filter = true; // true = filter is active, false = default ordering
  let filterValue; // 0 - 5 // What do be filtered by, rating wise

  let bookmarks = [];

  const setBookmarks = (bookmarks) => {
    store.bookmarks = bookmarks;
  };

  const addBookmark = (bookmark) => {
    // console.log(bookmark);
    store.bookmarks.push(bookmark);
  };

  return {
    bookmarks,
    setBookmarks,
    addBookmark,
  };
}());