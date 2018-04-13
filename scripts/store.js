'use strict';
const store = (function(){
  // BOOKMARK OBJECT ARRAY
  let bookmarks = [];


  // FILTERING STATES
  let filter = false; // true = filter is active, false = default ordering
  let filterValue; // 0 - 5 // What do be filtered by, rating wise


  // ERROR HANDLING
  const setError = (error) => {
    this.error = error;
  };

  // Initialize bookmarks to the store object
  const setBookmarks = (bookmarks) => {
    store.bookmarks = bookmarks;
  };

  // Add bookmarks to the store object
  const addBookmark = (bookmark) => {
    // console.log(bookmark);
    store.bookmarks.push(bookmark);
  };

  // FINDERS
  // -------------------------------------------------------
  const findById = (id) => {
    return store.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = (id) => {
    store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  // TOGGLES
  // -------------------------------------------------------
  // Add all properties to bookmarks in the store
  const findAndToggleEditMode = (id) => {
    const bookmark = store.findById(id);
    bookmark.editMode = !bookmark.editMode;
  };

  const findAndToggleExpanded = (id) => {
    const bookmark = store.findById(id);
    bookmark.expanded = !bookmark.expanded;
  };

  const toggleFilter = (id) => {
    this.filter = !this.filter;
  };

  return {
    bookmarks,
    setBookmarks,
    addBookmark,
    error: null,

    filter,
    filterValue,

    toggleFilter,
    findAndToggleExpanded,
    findById,
    findAndDelete,
    findAndToggleEditMode,
  };
}());