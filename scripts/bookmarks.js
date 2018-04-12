'use strict';
/*global $, store, api*/

const bookmarks = (function () {

  // Generate an HTML element template
  const generateBookmarkDOMelement = (bookmark) => {
    return `
      <li class="bookmark-item js-bookmark-item" data-item-id="${bookmark.id}">
        <h3>${bookmark.title}</h3>
        <span>${bookmark.url}</span>
        <button class="bookmark-delete js-bookmark-delete">
          <span class="button-label">DELETE</span>
        </button>
      </li>
    `;
  };

  // Render function responsible for rendering HTML on the DOM
  const render = () => {
    let html = '';
    store.bookmarks.forEach(bookmark => html += bookmarks.generateBookmarkDOMelement(bookmark));
    $('#display-bookmarks').html(html);
  };

  // Update the state of store.bookmarks
  const updateStoreBookmarks = (response) => {
    console.log(response);
    const bookmarks = [];
    // Create a new array of items, update the store's state
    // response.items.forEach(item => {

  };

  //get bookmark ID
  const getBookmarkIDFromElement = (bookmark) => {
    return $(bookmark).closest('.js-bookmark-item').data('item-id');
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
      // create a new bookmark in the store(callback)
      api.createBookmark(newBookmark, store.addBookmark(newBookmark));
    });
    // GET a list of current bookmarks and forEach bookmark
    // Add it to the store.bookmarks
    api.getBookmarks((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      render();
    });
    // console.log(store.bookmarks);
  };


  // Handle DELETE functionality from the DOM AND STORE
  const handleDeleteBookmarkClick = () => {
    // capture the ul that contains generated list elements
    $('#display-bookmarks').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIDFromElement(event.currentTarget);
      console.log(id);

      api.deleteBookmark(id, () => {
        api.getBookmarks(() => {
          store.findAndDelete(id);
          render();
          console.log(store.bookmarks);
        });
      });
    });
  };

  // const bindEventListeners = () => {
  //   generateBookmarkDOMelement;
  //   render;
  //   updateStoreBookmarks;
  //   handleNewBookmarkSubmit;
  //   handleDeleteBookmarkClick;
  // };

  return {
    generateBookmarkDOMelement,
    render,
    updateStoreBookmarks,
    handleNewBookmarkSubmit,
    handleDeleteBookmarkClick,
  };
}());