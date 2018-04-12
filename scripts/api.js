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
    let newBookmark = JSON.stringify({
      title: data.title,
      url: data.url,
    });
    // console.log(newBookmark);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: errorCallback,
    });
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