import { ComponentFixture, TestBed } from '@angular/core/testing';
import { List } from './list';
import type { Item } from '../../models/item';

describe('List', () => {
  let fixture: ComponentFixture<List>;
  let component: List;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [List], // standalone component
    }).overrideComponent(List, {
      set: {
        template: `<div data-testid="host"></div>`,
        imports: [],
      },
    });

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.emptyMessage()).toBe('');
    expect(component.items()).toEqual([]);
    expect(component.selectedItem()).toBeUndefined();
  });

  it('should accept inputs via setInput', () => {
    const newItems: Item[] = [{ id: 1, url: 'https://a.nz' }];
    fixture.componentRef.setInput('emptyMessage', 'Nothing here yet');
    fixture.componentRef.setInput('items', newItems);
    fixture.detectChanges();

    expect(component.emptyMessage()).toBe('Nothing here yet');
    expect(component.items()).toEqual(newItems);
  });

  it('should set selection and emit the item on onSelect', () => {
    const spy = jasmine.createSpy('select');
    component.onSelectEvent.subscribe(spy);

    const it: Item = { id: 2, url: 'https://b.nz' };
    component.onSelect(it);

    expect(component.selectedItem()).toEqual(it);
    expect(spy).toHaveBeenCalledWith(it);
  });

  it('should emit the item without changing selection on onDelete', () => {
    const spy = jasmine.createSpy('delete');
    component.onDeleteEvent.subscribe(spy);

    const selected: Item = { id: 5, url: 'https://sel.nz' };
    component.selectedItem.set(selected);

    const toDelete: Item = { id: 3, url: 'https://del.nz' };
    component.onDelete(toDelete);

    expect(spy).toHaveBeenCalledWith(toDelete);
    expect(component.selectedItem()).toEqual(selected);
  });

  it('should clear selection and emit once on onCancel', () => {
    const spy = jasmine.createSpy('cancel');
    component.onCancelEvent.subscribe(spy);

    component.selectedItem.set({ id: 9, url: 'https://x.nz' });
    component.onCancel();

    expect(component.selectedItem()).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should clear selection and emit the updated item on onUpdate', () => {
    const spy = jasmine.createSpy('update');
    component.onUpdateEvent.subscribe(spy);

    component.selectedItem.set({ id: 7, url: 'https://old.nz' });
    const updated: Item = { id: 7, url: 'https://new.nz' };

    component.onUpdate(updated);

    expect(spy).toHaveBeenCalledWith(updated);
    expect(component.selectedItem()).toBeUndefined();
  });
});