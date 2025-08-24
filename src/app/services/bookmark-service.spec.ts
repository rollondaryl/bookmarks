import { TestBed } from '@angular/core/testing';
import { BookmarkService } from './bookmark-service';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let setItemSpy: jasmine.Spy;

  beforeEach(() => {
    // Clean slate per test
    localStorage.clear();

    // Spy after clearing
    setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();

    TestBed.configureTestingModule({
      providers: [BookmarkService],
    });

    service = TestBed.inject(BookmarkService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});