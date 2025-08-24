import {
  Component,
  input,
  output,
} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { InputForm } from '../../shared/widgets/input-form/input-form';
import { Constants } from '../../shared/constants/constants';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, InputForm],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // Shared constants
  readonly constants = Constants;

  // Bookmarks passed in from the parent
  readonly bookmarks = input<Item[]>([]);

  // Event emitter to notify parent when a new bookmark is added
  readonly addBookmarkEvent = output<string>();

  // Called when the form is submitted, forwards the bookmark string to parent
  addBookmark(bookmark: string) {
    this.addBookmarkEvent.emit(bookmark);
  }
}
