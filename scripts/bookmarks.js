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

  const generateBookmarkString = (bookmarks) => {
    const bookmarkString = store.bookmarks.map((bookmark) => generateBookmarkDOMelement(bookmark));
    return bookmarkString.join('');
  };

  // Render function responsible for rendering HTML on the DOM
  const render = () => {
    // Filter render logic
    // if (store.filter){
    //   filter by store.filterValue, nested if's?
    // }
    // if (store.filter) {
    //   bookmarks = store.bookmarks.filter(bookmark => bookmark.rating === bookmark.rating)
    // }

    let html = generateBookmarkString(bookmarks);
    store.bookmarks.forEach(bookmark => html += bookmarks.generateBookmarkDOMelement(bookmark));
    $('#display-bookmarks').html(html);
  };

  //get bookmark ID
  const getBookmarkIDFromElement = (bookmark) => {
    return $(bookmark).closest('.js-bookmark-item').data('item-id');
  };

  // Add a bookmark to the store
  const updateStoreBookmarks = () => {

  }

  // Handle the form submit
  const handleNewBookmarkSubmit = () => {
    $('.add-bookmark-form').on('submit', event => {
      event.preventDefault(); // prevent form default behavior
      const newBookmarkTitle = $('#bookmark-title').val();
      const newBookmarkURL = $('#bookmark-url').val();
      let newBookmark = {
        title: newBookmarkTitle,
        url: newBookmarkURL,
        rating: null,
        description: null,
        expanded: false,
      };
      // create a new bookmark in the store(callback)
      api.createBookmark(newBookmark, () => {
        console.log(newBookmark);
        store.addBookmark(newBookmark);
        render();
      });
    });
    console.log(store.bookmarks);
    // GET a list of current bookmarks and forEach bookmark
    // Add each to the store.bookmarks
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
    generateBookmarkString,
    render,
    handleNewBookmarkSubmit,
    handleDeleteBookmarkClick,
  };
}());