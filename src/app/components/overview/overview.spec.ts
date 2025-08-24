import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Overview } from './overview';
import type { Item } from '../../shared/models/item';

describe('Overview', () => {
  let fixture: ComponentFixture<Overview>;
  let component: Overview;

  const makeItems = (n: number): Item[] =>
    Array.from({ length: n }, (_, i) => ({ id: i + 1, url: `https://site${i + 1}.nz` }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Overview],
    }).overrideComponent(Overview, {
      set: {
        template: `<div data-testid="host"></div>`, // logic-only tests
        imports: [], // decouple child components
      },
    });

    fixture = TestBed.createComponent(Overview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.bookmarks()).toEqual([]);
    expect(component.page()).toBe(0);
    expect(component.pageSize()).toBe(component.constants.PAGE_SIZE);
    expect(component.totalPages()).toBe(1);
    expect(component.pages()).toEqual([1]);
    expect(component.slicedBookmarks()).toEqual([]);
  });

  it('should compute totalPages as at least 1 even when there are no bookmarks', () => {
    fixture.componentRef.setInput('bookmarks', []);
    fixture.detectChanges();
    expect(component.totalPages()).toBe(1);
    expect(component.pages()).toEqual([1]);
  });

  it('should compute totalPages and pages from bookmarks length and pageSize', () => {
    const size = component.constants.PAGE_SIZE; // don’t assume a hardcoded number
    const total = size * 2 + Math.ceil(size / 2); // >2 pages
    fixture.componentRef.setInput('bookmarks', makeItems(total));
    fixture.detectChanges();

    const expectedPages = Math.ceil(total / size);
    expect(component.totalPages()).toBe(expectedPages);
    expect(component.pages()).toEqual(Array.from({ length: expectedPages }, (_, i) => i + 1));
  });

  it('should slice bookmarks for the current page', () => {
    const size = component.constants.PAGE_SIZE;
    const total = size * 2 + 3; // 2 full pages + partial
    const items = makeItems(total);
    fixture.componentRef.setInput('bookmarks', items);
    fixture.detectChanges();

    // page 0
    component.page.set(0);
    expect(component.slicedBookmarks().length).toBe(size);
    expect(component.slicedBookmarks()[0]).toEqual(items[0]);

    // page 1
    component.page.set(1);
    expect(component.slicedBookmarks().length).toBe(size);
    expect(component.slicedBookmarks()[0]).toEqual(items[size]);

    // last page
    component.page.set(2);
    expect(component.slicedBookmarks().length).toBe(3);
    expect(component.slicedBookmarks()[0]).toEqual(items[size * 2]);
  });

  it('should update pagination when pageSize changes', () => {
    const items = makeItems(17);
    fixture.componentRef.setInput('bookmarks', items);
    fixture.detectChanges();

    component.pageSize.set(5);
    expect(component.totalPages()).toBe(4);
    expect(component.pages()).toEqual([1, 2, 3, 4]);

    component.pageSize.set(10);
    expect(component.totalPages()).toBe(2);
    expect(component.pages()).toEqual([1, 2]);
  });

  it('should change current page when pageChangeEvent is called', () => {
    component.page.set(0);
    component.pageChangeEvent(2);
    expect(component.page()).toBe(2);
  });

  it('should emit onDeleteEvent when onClickDelete is called', () => {
    const spy = jasmine.createSpy('delete');
    component.onDeleteEvent.subscribe(spy);

    const item: Item = { id: 10, url: 'https://x.nz' };
    component.onClickDelete(item);

    expect(spy).toHaveBeenCalledWith(item);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit onUpdateEvent when onClickUpdate is called', () => {
    const spy = jasmine.createSpy('update');
    component.onUpdateEvent.subscribe(spy);

    const item: Item = { id: 11, url: 'https://y.nz' };
    component.onClickUpdate(item);

    expect(spy).toHaveBeenCalledWith(item);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should recompute totalPages and pages when bookmarks input changes', () => {
    const size = component.constants.PAGE_SIZE;

    fixture.componentRef.setInput('bookmarks', makeItems(size - 1));
    fixture.detectChanges();
    expect(component.totalPages()).toBe(1);
    expect(component.pages()).toEqual([1]);

    fixture.componentRef.setInput('bookmarks', makeItems(size + 1));
    fixture.detectChanges();
    expect(component.totalPages()).toBe(2);
    expect(component.pages()).toEqual([1, 2]);
  });

  it('should recompute slicedBookmarks when bookmarks input changes', () => {
    const size = component.constants.PAGE_SIZE;

    fixture.componentRef.setInput('bookmarks', makeItems(size));
    fixture.detectChanges();
    expect(component.slicedBookmarks().length).toBe(size);

    fixture.componentRef.setInput('bookmarks', makeItems(size + 2));
    fixture.detectChanges();
    expect(component.slicedBookmarks().length).toBe(size); // same page size
  });
});