import { computed, effect, Injectable, signal } from '@angular/core';
import { Item } from '../shared/models/item';
import sample from './sample.json'

const STORAGE_KEY = 'bookmarks';

@Injectable()
export class BookmarkService {
  // Load bookmarks from storage
  getBookmarks(): Item[] {
    try {
      const items = localStorage.getItem(STORAGE_KEY);
      // TODO: comment this line if you don't want a loaded default
      if (!items) return sample as Item[];

      return JSON.parse(items) as Item[];
    } catch {
      return [];
    }
  }

  // Local state
  bookmarks = signal<Item[]>(this.getBookmarks());
  count = computed(() => this.bookmarks().length);

  // Persist whenever bookmarks changes
  _ = effect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookmarks()));
  });

  // CRUD
  add(user: Item) { this.bookmarks.update(a => [...a, user]); }
  updateName(id: number, url: string) {
    this.bookmarks.update(a => a.map(u => u.id === id ? { ...u, url } : u));
  }
  remove(id: number) { this.bookmarks.update(a => a.filter(u => u.id !== id)); }
}
