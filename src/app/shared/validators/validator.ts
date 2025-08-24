import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Item } from '../models/item';

/**
 * Function to retrieve the current list of bookmarks.
 * @param getBookmarks
 * @returns
 */
export function inputValidator(getBookmarks: () => readonly Item[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // If the control value is empty, return required error
    if (!control.value) return { required: true };

    try {
      new URL(control.value);
      const bookmarks = getBookmarks();
      // Check if the URL already exists in the bookmarks
      if (bookmarks && bookmarks.find((bookmark) => bookmark.url === control.value)) {
        return { duplicate: true };
      }
      return null;
    } catch {
      // If URL constructor throws an error, the URL is invalid
      return { invalidUrl: true };
    }
  };
}
