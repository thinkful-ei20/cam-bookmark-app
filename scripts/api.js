'use strict';
/*global $, store*/

// API module methods are async functions for returning responses
const api = (function() {
  // base_url is locally scoped
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cam';

  // GET - Request data from a specified resource
  const getBookmarks = (callback) => {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  // POST - submit data to be processed to a specified resource
  const createBookmark = (data, callback, errorCallback) => {
    
  };

  // PATCH 
  const updateBookmark = (id, updateData, callback, errorCallback) => {
    
  };

  // DELETE
  const deletedBookmark = (id, callback, errorCallback) => {
    
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deletedBookmark,
  };
}());