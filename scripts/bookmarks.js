'use strict';
/*global $, store, api*/

const bookmarks = (function () {
  // Generate an HTML element template
  const generateBookmarkDOMelement = (bookmark) => {
    console.log(bookmark);
    let bookmarkTemplate = `
      <li class="bookmark-item js-bookmark-item" data-item-id="${bookmark.id}">
        <h3>${bookmark.title}</h3>
        <span>${bookmark.url}</span>
        <button class="bookmark-detailed-view js-bookmark-detailed-view">
          <span class="button-label">DETAILED VIEW</span>
        </button>
        <button class="bookmark-edit js-bookmark-edit">
          <span class="button-label">EDIT</span>
        </button>
        <button class="bookmark-delete js-bookmark-delete">
          <span class="button-label">DELETE</span>
        </button>
      </li>
    `;
    if (bookmark.editMode) {
      bookmarkTemplate = `
      <li class="bookmark-item js-bookmark-item" data-item-id="${bookmark.id}">
        <h3>${bookmark.title}</h3>
        <span>${bookmark.url}</span>
        <textarea rows="4" cols="50" class="description-textarea" placeholder="Description of Bookmark...">${bookmark.desc || ''}</textarea>
      <label for="rating">Rate your bookmark 0 - 5:
      <select class="bookmark-rating js-bookmark-rating">
        <option value="0"${(bookmark.rating === 0) ? ' selected' : ''}>0</option>
        <option value="1"${(bookmark.rating === 1) ? ' selected' : ''}>1</option>
        <option value="2"${(bookmark.rating === 2) ? ' selected' : ''}>2</option>
        <option value="3"${(bookmark.rating === 3) ? ' selected' : ''}>3</option>
        <option value="4"${(bookmark.rating === 4) ? ' selected' : ''}>4</option>
        <option value="5"${(bookmark.rating === 5) ? ' selected' : ''}>5</option>
      </select>
      </label>
      <button class="bookmark-edit js-bookmark-edit">
          <span class="button-label">FINISH EDIT</span>
        </button>
      </li>
      `;
    }
    if (bookmark.expanded) {
      bookmarkTemplate = `
      <li class="bookmark-item js-bookmark-item" data-item-id="${bookmark.id}">
      <h3>${bookmark.title}</h3>
      <span>${bookmark.url}</span>
      <span>Rating: ${bookmark.rating}</span>
      <span>Description: ${bookmark.desc}</span>
      <button class="bookmark-detailed-view js-bookmark-detailed-view">
        <span class="button-label">LEAVE DETAILED VIEW</span>
      </button>
      </li>
      `;
    }
    return bookmarkTemplate;
  };

  // generates an array of string of html elements and joins them together into one big string
  const generateBookmarkString = (bookmarks) => {
    const bookmarkString = bookmarks.map((bookmark) => generateBookmarkDOMelement(bookmark));
    return bookmarkString.join('');
  };

  // Render function responsible for rendering correct HTML elements on the DOM
  const render = () => {
    let html = generateBookmarkString(store.bookmarks);
    $('#display-bookmarks').html(html);
  };

  //get bookmark ID
  const getBookmarkIDFromElement = (bookmark) => {
    return $(bookmark).closest('.js-bookmark-item').data('item-id');
  };

  // Handle the form submit
  const handleNewBookmarkSubmit = () => {
    console.log('HELLOOOO');
    $('.add-bookmark-form').on('submit', event => {
      event.preventDefault(); // prevent form default behavior
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
        store.addBookmark(newBookmark);
        render();
      });
    });
    // console.log(store.bookmarks);
  };

  // Handle toggling edit mode state of the object and rerender to render the object in editing mode
  const handleEditModeClick = () => {
    $('#display-bookmarks').on('click', '.js-bookmark-edit', event => {
      // The default bookmarks lack the editMode property
      // update store.bookmarks with the editMode/expand properties, both false
      // console.log(bookmarks); // editMode: false
      // Get the ID of the click event bookmark
      const id = getBookmarkIDFromElement(event.currentTarget);
      // console.log(id);
      if (store.findById(id).editMode) {
        let description = $(event.currentTarget).parent().find('.description-textarea').val();
        let rating = $(event.currentTarget).parent().find('.js-bookmark-rating').val();
        // console.log(description);
        store.findById(id).desc = description;
        store.findById(id).rating = parseInt(rating);
      }
      store.findAndToggleEditMode(id);
      render();
    });
  };

  // Handles the expanded(detailed view) functionality
  const handleExpandedView = () => { 
    $('#display-bookmarks').on('click', '.js-bookmark-detailed-view', event => { 
      const id = getBookmarkIDFromElement(event.currentTarget); 
      let description = $(event.currentTarget).parent().find('.description-textarea').val();
      let rating = $(event.currentTarget).parent().find('.js-bookmark-rating').val();
      store.findById(id).desc = description;
      store.findById(id).rating = parseInt(rating);
      store.findAndToggleExpanded(id); 
      console.log(store.bookmarks);
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

  const bindEventListeners = () => {
    console.log('HELLO');
    handleNewBookmarkSubmit();
    handleEditModeClick();
    handleExpandedView();
    handleDeleteBookmarkClick();
  };

  return {
    bindEventListeners: bindEventListeners,
    render: render,
  };
}());