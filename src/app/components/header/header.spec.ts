import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { Item } from '../../shared/models/item';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.bookmarks()).toEqual([]);
  });

  it('should accept bookmarks via setInput', () => {
    const data: Item[] = [
      { id: 1, url: 'https://a.nz' },
      { id: 2, url: 'https://b.nz' },
    ];
    fixture.componentRef.setInput('bookmarks', data);
    fixture.detectChanges();

    expect(component.bookmarks()).toEqual(data);
  });

  it('should emit addBookmarkEvent when addBookmark is called', () => {
    const spy = jasmine.createSpy('add');
    component.addBookmarkEvent.subscribe(spy);

    component.addBookmark('https://new.nz');

    expect(spy).toHaveBeenCalledWith('https://new.nz');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
