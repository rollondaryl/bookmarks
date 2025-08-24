import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagination } from './pagination';

describe('Pagination', () => {
  let fixture: ComponentFixture<Pagination>;
  let component: Pagination;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Pagination] });
    fixture = TestBed.createComponent(Pagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const setTotalPages = (n: number) => {
    fixture.componentRef.setInput('totalPages', n);
    fixture.detectChanges();
  };

  it('should create with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.activeIndex()).toBe(0);
    expect(component.page()).toBe(0);
    expect(component.pageSize()).toBe(0);
    expect(component.pages()).toEqual([0]);
    expect(component.totalPages()).toBe(0);
  });

  it('should do nothing on onNext when totalPages is 0', () => {
    const spy = jasmine.createSpy('pageChange');
    component.pageChangeEvent.subscribe(spy);
    setTotalPages(0);
    component.onNext();
    expect(component.activeIndex()).toBe(0);
    expect(component.page()).toBe(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should do nothing on onPrevious when already at the first page', () => {
    const spy = jasmine.createSpy('pageChange');
    component.pageChangeEvent.subscribe(spy);
    setTotalPages(5);
    component.onPrevious();
    expect(component.activeIndex()).toBe(0);
    expect(component.page()).toBe(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should advance one page and emit on onNext', () => {
    const spy = jasmine.createSpy('pageChange');
    component.pageChangeEvent.subscribe(spy);
    setTotalPages(5);
    component.onNext();
    expect(component.activeIndex()).toBe(1);
    expect(component.page()).toBe(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should stop at the last page on onNext', () => {
    const received: number[] = [];
    component.pageChangeEvent.subscribe(v => received.push(v));
    setTotalPages(5);
    component.onNext(); // 1
    component.onNext(); // 2
    component.onNext(); // 3
    component.onNext(); // 4
    expect(component.activeIndex()).toBe(4);
    expect(component.page()).toBe(4);
    expect(received).toEqual([1, 2, 3, 4]);
    component.onNext(); // no-op
    expect(component.activeIndex()).toBe(4);
    expect(component.page()).toBe(4);
    expect(received).toEqual([1, 2, 3, 4]);
  });

  it('should go back one page and emit on onPrevious', () => {
    const spy = jasmine.createSpy('pageChange');
    component.pageChangeEvent.subscribe(spy);
    setTotalPages(4);
    component.onNext(); // 1
    component.onNext(); // 2
    component.onPrevious(); // 1
    expect(component.activeIndex()).toBe(1);
    expect(component.page()).toBe(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should stop at the first page on onPrevious', () => {
    const received: number[] = [];
    component.pageChangeEvent.subscribe(v => received.push(v));
    setTotalPages(3);
    component.onNext();     // 1
    component.onPrevious(); // 0
    component.onPrevious(); // no-op
    expect(component.activeIndex()).toBe(0);
    expect(component.page()).toBe(0);
    expect(received).toEqual([1, 0]);
  });

  it('should not emit when next/previous keep the page unchanged', () => {
    const spy = jasmine.createSpy('pageChange');
    component.pageChangeEvent.subscribe(spy);
    setTotalPages(1);
    component.onNext();
    component.onPrevious();
    expect(spy).not.toHaveBeenCalled();
    expect(component.page()).toBe(0);
    expect(component.activeIndex()).toBe(0);
  });
});