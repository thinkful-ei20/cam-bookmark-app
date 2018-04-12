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
  const createBookmark = (name, callback) => {
   
  };

  // PATCH 
  const updateBookmark = (id, updateData, callback) => {

  };



  return {

  };
}());