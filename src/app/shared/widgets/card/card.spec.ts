import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Card } from './card';

describe('Card', () => {
  let fixture: ComponentFixture<Card>;
  let component: Card;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Card],
    })
      .overrideComponent(Card, {
        set: {
          // Simple template just for testing the title input
          template: `<h2 data-testid="title">{{ title() }}</h2>`,
        },
      });

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses the default empty title', () => {
    const titleNode = el.querySelector('[data-testid="title"]')!;
    expect(component.title()).toBe('');
    expect(titleNode.textContent).toBe('');
  });

  it('accepts a title via setInput and renders it', () => {
    fixture.componentRef.setInput('title', 'List of Bookmarks');
    fixture.detectChanges();

    const titleNode = el.querySelector('[data-testid="title"]')!;
    expect(component.title()).toBe('List of Bookmarks');
    expect(titleNode.textContent).toBe('List of Bookmarks');
  });
});