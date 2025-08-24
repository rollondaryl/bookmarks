import { Component, computed, signal } from '@angular/core';
import { Overview, Results, Header } from './components';
import { BookmarkService } from './services/bookmark-service';
import { Item } from './shared/models/item';

@Component({
  selector: 'app-root',
  imports: [Header, Overview, Results],
  providers: [BookmarkService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private bookmarkService: BookmarkService) {}

  // Read-only views of service state (auto-update when service signals change)
  bookmarks = computed(() => this.bookmarkService.bookmarks());
  count = computed(() => this.bookmarkService.count());

  // Toggles the "success" screen after adding a bookmark
  isSuccess = signal(false);

  // Holds the last added URL (shown on the results screen)
  bookmark = signal<string>('');

  // Stores the currently selected item (used by child components)
  onSelectEvent = signal<Item>({ id: 0, url: '' });

  // Stores the last item requested for deletion
  onDeleteEvent = signal<Item>({ id: 0, url: '' });

  // Add a new bookmark then flip to the success view
  addBookmark(bookmarkURL: string) {
    this.bookmark.set(bookmarkURL);
    this.isSuccess.set(true);
    this.bookmarkService.add({ id: Date.now(), url: bookmarkURL });
  }

  // Remove a bookmark by id
  onClickDelete(bookmark: Item) {
    this.bookmarkService.remove(bookmark.id);
  }

  // Update a bookmark’s URL
  onClickUpdate(bookmark: Item) {
    this.bookmarkService.updateName(bookmark.id, bookmark.url);
  }

  // Return from the results screen back to the overview
  goBack() {
    this.isSuccess.set(false);
  }
}
