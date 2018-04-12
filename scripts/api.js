'use strict';
/*global $*/

const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cam';

  // GET - Request data from a specified resource
  const getBookmarks = (callback) => {
    // Load JSON-encoded data from the server using the GET HTTP request
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  // POST - submit data to be processed to a specified resource
  const createBookmark = (name, callback) => {
    // ajax call to be submitted.
    // Causing a change in state or side effects on the server
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: {
        id: cuid(),
        title: ,
        url: ,
        rating: ,
        description: ,
        editMode: false, 
      },
      sucess: callback,
      error: errorCallback,
    });
  };

  const updateItem = (id, updateData, callback) => {

  }

  const findAndUpdate = () => {

  }


  return {

  };
}());