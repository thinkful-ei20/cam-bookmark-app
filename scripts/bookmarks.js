'use strict';
/*global $, store, api*/

const bookmarks = (function () {

  // Generate an HTML element template
  const generateBookmarkDOMelement = (bookmark) => {
    return `
      <li class="bookmark-item js-bookmark-item">
        <h3>${bookmark.title}</h3>
        <span>${bookmark.url}</span>
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
  const updateStoreBookmarks = (response) => {
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
  const handleNewBookmarkSubmit = () => {
    $('.add-bookmark-form').on('submit', event => {
      event.preventDefault(); // prevent form default behavior
      const newBookmarkTitle = $('#bookmark-title').val();
      const newBookmarkURL = $('#bookmark-url').val();
      let newBookmark = {
        title: newBookmarkTitle,
        url: newBookmarkURL,
      };
      api.createBookmark(newBookmark, store.addBookmark(newBookmark));
    });
    api.getBookmarks((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      render();
    });
    console.log(store.bookmarks);
  };

  return {
    generateBookmarkDOMelement,
    render,
    updateStoreBookmarks,
    handleNewBookmarkSubmit,
  };
}());