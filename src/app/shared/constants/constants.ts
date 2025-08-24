export class Constants {
  // Validation messages
  static readonly INVALID_URL = 'Invalid URL format';
  static readonly DUPLICATE_URL = 'URL already exists';

  // Overview screen
  static readonly OVERVIEW_TITLE = 'List of Bookmarks';
  static readonly OVERVIEW_NO_BOOKMARKS_AVAILABLE = 'No bookmarks available.';

  // Results screen
  static readonly RESULTS_THANK_YOU = 'Thank you for your submission!';
  static readonly RESULTS_HAS_BEEN_ADDED = 'Your bookmark {new} has been added successfully!';
  static readonly RESULTS_GO_BACK = 'Go Back';
  static readonly RESULTS_GO_BACK_A11Y = 'Go back to the bookmarks list';

  // Widgets
  static readonly PAGINATION_NEXT = '>';
  static readonly PAGINATION_NEXT_A11Y = 'Next button';
  static readonly PAGINATION_PREVIOUS = '<';
  static readonly PAGINATION_PREVIOUS_A11Y = 'Previous button';
  static readonly INPUT_FORM_HIDDEN_TEXT_A11Y = '<';
  static readonly INPUT_FORM_INPUT_PLACEHOLDER = 'Add bookmarks…';
  static readonly INPUT_FORM_ADD_A11Y = 'Add URL';
  static readonly INPUT_FORM_UPDATE_A11Y = 'URL update';
  static readonly INPUT_FORM_CANCEL_A11Y = 'Cancel editing and clear the field';
  static readonly LIST_SELECT_A11Y = 'Select URL';
  static readonly LIST_DELETE_A11Y = 'Delete URL';

  // Actions
  static readonly ADD = 'Add';
  static readonly UPDATE = 'Update';
  static readonly CANCEL = 'Cancel';

  // Settings
  static readonly PAGE_SIZE = 20;
}
