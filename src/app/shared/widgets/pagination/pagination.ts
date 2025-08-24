import { Component, input, output, signal } from '@angular/core';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  // Shared constants
  readonly constants = Constants;
  // Currently active page index (0-based)
  activeIndex = signal<number>(0);  

  // Current page index used for emitting to parent (0-based)
  page = signal(0);

  // Items per page (provided by parent)
  pageSize = input<number>(0);

  // Array of page numbers provided by parent (e.g. [1, 2, 3])
  pages = input<number[]>([0]);

  // Total number of pages (provided by parent)
  totalPages = input<number>(0);

  // Event emitted when the page changes
  pageChangeEvent = output<number>();

  // Move to the next page if not already on the last
  onNext() {                                         
    if (this.activeIndex() >= this.totalPages() - 1) return;
    if (this.page() < this.totalPages() - 1) {
      this.page.update((p) => p + 1);
      this.pageChangeEvent.emit(this.page());
    }
    this.activeIndex.set(this.activeIndex() + 1);
  }

  // Move to the previous page if not already on the first
  onPrevious() {                                     
    if (this.activeIndex() === 0) return;
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
      this.pageChangeEvent.emit(this.page());
    }
    this.activeIndex.set(this.activeIndex() - 1);
  }
}