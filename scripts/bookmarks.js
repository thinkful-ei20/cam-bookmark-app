'use strict';
/*global $, store*/

const bookmarks = (function () {

  // Generate an HTML element template
  const generateBookmarkDOMelement = (bookmark) => {
    return `
      <li class="bookmark-item js-bookmark-item">
        <h3>${bookmark.title}</h3>
        <span>${bookmark.rating}</span>
      </li>
    `;
  };

  // Render function responsible for rendering HTML on the DOM
  const render = () => {
    let html = '';
    store.bookmarks.forEach(bookmark => html += bookmarks.generateBookmarkDOMelement(bookmark));
    $('.display-bookmarks').html(html);
  };

  // Update the state of store.bookmarks
  const updateStoreBookmarksList = (response) => {
    console.log(response);
    const bookmarks = [];
    // Create a new array of items, update the store's state
    // response.items.forEach(item => {

    //   bookmarks.push({
    //     id: item.id,
    //     //title: bookmarkTitle,
    //   });
    // });
    
  };

  // Handle the form submit
  const handleFormSubmit = () => {
    $('.add-bookmark-form').on('submit', event => {
      event.preventDefault(); // prevent form default behavior

      const newBookmark = $('.bookmark-title').val();
      console.log(newBookmark);
    });
  };

  return {
    generateBookmarkDOMelement,
    render,
    updateStoreBookmarksList,
    handleFormSubmit,
  };
}());