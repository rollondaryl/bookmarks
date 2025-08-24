import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { BookmarkService } from './services/bookmark-service';
import { signal, computed } from '@angular/core';
import type { Item } from './shared/models/item';

class MockBookmarkService {
  bookmarks = signal<Item[]>([]);
  count = computed(() => this.bookmarks().length);
  add = jasmine.createSpy('add');
  remove = jasmine.createSpy('remove');
  updateName = jasmine.createSpy('updateName');
}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let mockSvc: MockBookmarkService;

  beforeEach(() => {
    mockSvc = new MockBookmarkService();

    TestBed.configureTestingModule({
      imports: [App], // works if App is standalone
      providers: [{ provide: BookmarkService, useValue: mockSvc }],
    }).overrideComponent(App, {
      set: {
        template: `<div data-testid="host"></div>`, // logic-only tests
        imports: [], // decouple children
      },
    });

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.count()).toBe(22);
    expect(component.isSuccess()).toBeFalse();
    expect(component.bookmark()).toBe('');
    expect(component.onSelectEvent()).toEqual({ id: 0, url: '' });
    expect(component.onDeleteEvent()).toEqual({ id: 0, url: '' });
  });

});