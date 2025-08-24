import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Results } from './results';

describe('Results', () => {
  let fixture: ComponentFixture<Results>;
  let component: Results;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Results],
    }).overrideComponent(Results, {
      set: {
        template: `<div data-testid="host"></div>`,
        imports: [],
      },
    });

    fixture = TestBed.createComponent(Results);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.newlyAddedURL()).toBe('');
    const expected = component.constants.RESULTS_HAS_BEEN_ADDED.replace('{new}', 'the bookmark');
    expect(component.newBookmark()).toBe(expected);
  });

  it('should render the URL inside the success message when provided', () => {
    fixture.componentRef.setInput('newlyAddedURL', 'https://example.nz');
    fixture.detectChanges();
    const expected = component.constants.RESULTS_HAS_BEEN_ADDED.replace('{new}', 'https://example.nz');
    expect(component.newBookmark()).toBe(expected);
  });

  it('should fall back to the placeholder when URL is emptied again', () => {
    fixture.componentRef.setInput('newlyAddedURL', 'https://example.nz');
    fixture.detectChanges();
    fixture.componentRef.setInput('newlyAddedURL', '');
    fixture.detectChanges();

    const expected = component.constants.RESULTS_HAS_BEEN_ADDED.replace('{new}', 'the bookmark');
    expect(component.newBookmark()).toBe(expected);
  });

  it('should emit goBackEvent when goBack is called', () => {
    const spy = jasmine.createSpy('back');
    component.goBackEvent.subscribe(spy);

    component.goBack();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});