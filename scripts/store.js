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

  const findById = (id) => {
    return store.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = (id) => {
    store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  return {
    bookmarks,
    setBookmarks,
    addBookmark,
    findById,
    findAndDelete,
  };
}());