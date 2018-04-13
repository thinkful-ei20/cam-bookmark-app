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
        <button class="bookmark-edit js-bookmark-edit">
          <span class="button-label">EDIT</span>
        </button>
      </li>
    `;
  };

  const generateBookmarkString = (bookmarks) => {
    const bookmarkString = bookmarks.map((bookmark) => generateBookmarkDOMelement(bookmark));
    return bookmarkString.join('');
  };

  // Render function responsible for rendering correct HTML elements on the DOM
  const render = () => {
    // Filter render logic
    // if (store.filter){
    //   filter by store.filterValue, nested if's?
    // }
    // if (store.filter) {
    //   bookmarks = store.bookmarks.filter(bookmark => bookmark.rating === bookmark.rating)
    // }

    let bookmarks = store.updateStoreBookmarks(store.bookmarks);
    // console.log(bookmarks);
    let html = generateBookmarkString(bookmarks);
    store.bookmarks.forEach((bookmark) => generateBookmarkDOMelement(bookmark));
    $('#display-bookmarks').html(html);
  };

  //get bookmark ID
  const getBookmarkIDFromElement = (bookmark) => {
    return $(bookmark).closest('.js-bookmark-item').data('item-id');
  };

  // Handle the form submit
  const handleNewBookmarkSubmit = () => {
    $('.add-bookmark-form').on('submit', event => {
      // event.preventDefault(); // prevent form default behavior
      const newBookmarkTitle = $('#bookmark-title').val();
      const newBookmarkURL = $('#bookmark-url').val();
      let newBookmark = {
        title: newBookmarkTitle,
        url: newBookmarkURL,
        rating: null,
        desc: null,
        editMode: false,
        expanded: false,
      };
      // create a new bookmark in the store(callback)
      api.createBookmark(newBookmark, () => {
        // console.log(newBookmark);
        store.addBookmark(newBookmark);
        render();
      });
    });
    // console.log(store.bookmarks);
    // GET a list of current bookmarks and forEach bookmark
    // Add each to the store.bookmarks
    api.getBookmarks((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      render();
    });
    // console.log(store.bookmarks);
  };

  // Handle toggling edit mode state of the object and rerender to render the object in editing mode
  const handleEditModeClick = () => {
    $('#display-bookmarks').on('click', '.js-bookmark-edit', event => {
      // The default bookmarks lack the editMode property
      // update store.bookmarks with the editMode/expand properties, both false
      let bookmarks = store.updateStoreBookmarks(store.bookmarks);
      // console.log(bookmarks); // editMode: false
      // Get the ID of the click event bookmark
      const id = getBookmarkIDFromElement(event.currentTarget);
      // console.log(id);

      store.findAndToggleEditMode(id);
      // Per click of the edit button, the editMode property is now able to be toggled
      store.updateStoreBookmarks(bookmarks);
      console.log(store.bookmarks); // editMode: true
      render();
    });
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
    generateBookmarkString,
    // updateStoreBookmarks,
    render,
    handleEditModeClick,
    handleNewBookmarkSubmit,
    handleDeleteBookmarkClick,
  };
}());