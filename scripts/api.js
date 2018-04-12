'use strict';
/*global $*/

// API module methods are async functions for returning responses
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cam';
  // GET - Request data from a specified resource
  const getBookmarks = (callback) => {
    // Load JSON-encoded data from the server using the GET HTTP request
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  // POST - submit data to be processed to a specified resource
  const createBookmark = (data, callback, errorCallback) => {
    $.ajax({
      url:`${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: callback,
      error: errorCallback,
    });
  };

  // PATCH 
  const updateBookmark = (id, updateData, callback, errorCallback) => {
    $.ajax({
      url:`${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: errorCallback,
    });
  };

  // DELETE
  const deletedBookmark = (id, callback, errorCallback) => {
    $.ajax({
      url:`${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback,
      error: errorCallback,
    });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deletedBookmark,

  };
}());