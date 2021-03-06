'use strict';
/*global $, store, api*/

const bookmarks = (function () {

  // GENERATORS v
  // -------------------------------------------------------
  // generate error message on the DOM based on server error
  const generateError = (err) => {
    let message = '';
    if(err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} SERVER ERROR`;
    }

    return `
    <section class="error-content">
      <button id="cancel-error">X</button>
    </section>
    `;
  };

  // Generate an HTML element template
  const generateBookmarkDOMelement = (bookmark) => {
    let bookmarkTemplate = `
      <li class="bookmark-item js-bookmark-item" data-item-id="${bookmark.id}">
        <h1>${bookmark.title}</h1>
        <h3>Rated: ${bookmark.rating || ''}</h3>
        <span>${bookmark.url}</span><br>
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
        <h1>${bookmark.title}</h1>
        <span>${bookmark.url}</span><br>
        <textarea rows="4" cols="50" class="description-textarea" placeholder="Description of Bookmark..." contenteditable="true" aria-multiline="true">${bookmark.desc || ''}</textarea><br>
      <label for="rating">Rate your bookmark 0 - 5:<br>
      <select class="bookmark-rating js-bookmark-rating">
        <option role="option" value="0"${(bookmark.rating === 0) ? ' selected' : ''}>0</option>
        <option role="option" value="1"${(bookmark.rating === 1) ? ' selected' : ''}>1</option>
        <option role="option" value="2"${(bookmark.rating === 2) ? ' selected' : ''}>2</option>
        <option role="option" value="3"${(bookmark.rating === 3) ? ' selected' : ''}>3</option>
        <option role="option" value="4"${(bookmark.rating === 4) ? ' selected' : ''}>4</option>
        <option role="option" value="5"${(bookmark.rating === 5) ? ' selected' : ''}>5</option>
      </select>
      </label><br>
      <button class="bookmark-edit js-bookmark-finish-edit">
          <span class="button-label">FINISH EDIT</span>
        </button>
      </li>
      `;
    }

    if (bookmark.expanded) {
      bookmarkTemplate = `
      <li class="bookmark-item js-bookmark-item" data-item-id="${bookmark.id}">
      <h1>${bookmark.title}</h1><br>
      <button><a href="${bookmark.url}">VISIT BOOKMARK</a></button><br>
      <label>Rating:</label>
      <span class="rating-span">${bookmark.rating}</span><br>
      <label>Description:</label>
      <span class"description-span">${bookmark.desc}</span><br>
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


  // RENDER  
  // -------------------------------------------------------
  // Render function responsible for rendering correct HTML elements on the DOM
  const render = () => {
    let filteredItems = store.bookmarks;

    // error handling
    if(store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }

    // filter render
    if (store.filterValue > 0) {
      filteredItems = store.bookmarks.filter(bookmark => parseInt(bookmark.rating) === parseInt(store.filterValue));
    }

    let html = generateBookmarkString(filteredItems);
    $('#display-bookmarks').html(html);
  };


  // HANDLERS v
  // -------------------------------------------------------
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
      const newBookmarkRating = $('#bookmark-rating-input').val();
      const newBookmarkDescription = $('#bookmark-desc-input').val();
      let newBookmark = {
        title: newBookmarkTitle,
        url: newBookmarkURL,
        rating: newBookmarkRating || null,
        desc: newBookmarkDescription || null,
        editMode: false,
        expanded: false,
      };
      // create a new bookmark in the store(callback)
      api.createBookmark(newBookmark, () => {
        store.addBookmark(newBookmark);
        render();
      });
    });
  };

  // Handle toggling edit mode state of the object and rerender to render the object in editing mode
  const handleEditModeClick = () => {
    $('#display-bookmarks').on('click', '.js-bookmark-edit', event => {
      const id = getBookmarkIDFromElement(event.currentTarget);
      store.findAndToggleEditMode(id);
      render();
    });
  };

  const handleEditSubmit = () => {
    $('#display-bookmarks').on('click', '.js-bookmark-finish-edit', event => {
      const id = getBookmarkIDFromElement(event.currentTarget);
      let description = $(event.currentTarget).parent().find('.description-textarea').val();
      let rating = $(event.currentTarget).parent().find('.js-bookmark-rating').val();
      api.updateBookmark(id, {desc: description, rating}, () => {
        store.findAndToggleEditMode(id);
        store.findById(id).desc = description;
        store.findById(id).rating = parseInt(rating);
        render();
      });
    }); 
  };

  // Handles the expanded(detailed view) functionality
  const handleExpandedView = () => { 
    $('#display-bookmarks').on('click', '.js-bookmark-detailed-view', event => { 
      // get the ID of the bookmark html element
      const id = getBookmarkIDFromElement(event.currentTarget); 
    
      // toggle the expanded state
      store.findAndToggleExpanded(id); 
      render(); 
    }); 
  };

  // Handle DELETE functionality from the DOM AND STORE
  const handleDeleteBookmarkClick = () => {
    // capture the ul that contains generated list elements
    $('#display-bookmarks').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIDFromElement(event.currentTarget);

      api.deleteBookmark(id, () => {
        api.getBookmarks(() => {
          store.findAndDelete(id);
          render();
        });
      });
    });
  };


  const handleFilterState = () => {
    $('select').on('change', () => {
      let selectedVal = $('select').val();
      store.filterValue = selectedVal; // Filter value to selectedVal
      render();
    });
  };
 
  // EVENT LISTENERS v
  // -------------------------------------------------------
  const bindEventListeners = () => {
    handleNewBookmarkSubmit();
    handleEditModeClick();
    handleExpandedView();
    handleDeleteBookmarkClick();
    handleFilterState();
    handleEditSubmit();
  };

  return {
    bindEventListeners: bindEventListeners,
    render: render,
  };
}());