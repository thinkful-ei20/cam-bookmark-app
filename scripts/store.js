'use strict';

const store = (function(){
  let bookmarks = [];

  const setBookmarks = (bookmarks) => {
    this.bookmarks = bookmarks;
  };

  return {
    bookmarks,
    setBookmarks,
  };
}());