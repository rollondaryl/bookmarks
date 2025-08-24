import { Component, computed, input, output, signal } from '@angular/core';
import { Constants } from '../../shared/constants/constants';
import { Card, List, Pagination } from '../../shared/widgets';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-overview',
  imports: [Card, List, Pagination],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  // Shared constants
  readonly constants = Constants;

  // Bookmarks passed in from the parent
  bookmarks = input<Item[]>([]);

  // Events emitted to the parent
  onDeleteEvent = output<Item>();
  onUpdateEvent = output<Item>();

  // State for pagination
  pageSize = signal(this.constants.PAGE_SIZE); // how many items per page
  page = signal(0);                            // current page index

  // Total number of pages (always at least 1)
  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.bookmarks().length / this.pageSize()))
  );

  // Current slice of bookmarks for the active page
  slicedBookmarks = computed(() => {
    const start = this.page() * this.pageSize();
    return this.bookmarks().slice(start, start + this.pageSize());
  });

  // Generate an array of page numbers for the paginator
  pages = computed(() => {
    const len = Math.max(1, Math.ceil(this.bookmarks().length / this.pageSize()));
    return Array.from({ length: len }, (_, i) => i + 1);
  });

  // Handle page change from the pagination component
  pageChangeEvent(page: number) {
    this.page.set(page);
  }

  // Trigger delete/update events when user clicks actions
  onClickDelete(bookmark: Item) {
    this.onDeleteEvent.emit(bookmark);
  }

  onClickUpdate(bookmark: Item) {
    this.onUpdateEvent.emit(bookmark);
  }
}
