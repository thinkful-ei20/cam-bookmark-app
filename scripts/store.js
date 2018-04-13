'use strict';
const store = (function(){
  // let editMode = false; // false = simple view of bookmarks, true = form view, which leads to submit event
  let filter = false; // true = filter is active, false = default ordering
  let filterValue; // 0 - 5 // What do be filtered by, rating wise

  let bookmarks = [];

  const setError = (error) => {
    this.error = error;
  };

  const setBookmarks = (bookmarks) => {
    store.bookmarks = bookmarks;
  };

  const addBookmark = (bookmark) => {
    // console.log(bookmark);
    store.bookmarks.push(bookmark);
  };

  // const updateStoreBookmarks = (bookmarks) => {
  //   const newBookmarks = bookmarks.map((bookmark) => {
  //     return {
  //       id: bookmark.id,
  //       title: bookmark.title,
  //       url: bookmark.url,
  //       rating: bookmark.rating,
  //       desc: bookmark.desc,
  //       editMode: bookmark.editMode,
  //       expanded: false,
  //     };
  //   });
  //   return newBookmarks;
  // };

  const findById = (id) => {
    return store.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = (id) => {
    store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  // Add all properties to bookmarks in the store
  const findAndToggleEditMode = (id) => {
    const bookmark = store.findById(id);
    bookmark.editMode = !bookmark.editMode;
  };

  const findAndToggleExpanded = (id) => {
    const bookmark = store.findById(id);
    bookmark.expanded = !bookmark.expanded;
  };



  return {
    bookmarks,
    setBookmarks,
    addBookmark,
    error: null,

    filter,
    filterValue,

    findAndToggleExpanded,
    findById,
    findAndDelete,
    findAndToggleEditMode,
  };
}());