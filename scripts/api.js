'use strict';
/*global $, store*/
console.log('api.js operational');
// API module methods are async functions for returning responses
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cam/bookmarks';

  const mockObj = {
    id: cuid();
    title: 'abcde',
    rating: 5,
  };

  // TESTING POST
  $.ajax({
    url: BASE_URL,
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: mockObj,
    success: (response) => {
      console.log(response);
    },
  });

  // GET - Request data from a specified resource
  const getBookmarks = (callback) => {
    // Load JSON-encoded data from the server using the GET HTTP request
    $.getJSON(`${BASE_URL}`, callback);
    console.log($.getJSON(`${BASE_URL}`, callback));
  };

  // POST - submit data to be processed to a specified resource
  const createBookmark = (data, callback, errorCallback) => {
    // $.ajax({
    //   url:`${BASE_URL}`,
    //   method: 'POST',
    //   contentType: 'application/json',
    //   data: JSON.stringify(data),
    //   success: callback,
    //   error: errorCallback,
    // });
    // store.setBookmarks(data);
  };

  // PATCH 
  const updateBookmark = (id, updateData, callback, errorCallback) => {
    // $.ajax({
    //   url:`${BASE_URL}/${id}`,
    //   method: 'PATCH',
    //   contentType: 'application/json',
    //   data: JSON.stringify(updateData),
    //   success: callback,
    //   error: errorCallback,
    // });
  };

  // DELETE
  const deletedBookmark = (id, callback, errorCallback) => {
    // $.ajax({
    //   url:`${BASE_URL}/${id}`,
    //   method: 'DELETE',
    //   success: callback,
    //   error: errorCallback,
    // });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deletedBookmark,

  };
}());