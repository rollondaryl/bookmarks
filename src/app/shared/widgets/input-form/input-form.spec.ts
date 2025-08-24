import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputForm } from './input-form';
import type { Item } from '../../models/item';

describe('InputForm', () => {
  let fixture: ComponentFixture<InputForm>;
  let component: InputForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputForm], // standalone component
    });

    fixture = TestBed.createComponent(InputForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const setItems = (urls: string[]) => {
    const items = urls.map((url, i) => ({ id: i + 1, url }));
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    return items as Array<{ id: number; url: string }>;
  };

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isEditMode()).toBeFalse();
    expect(component.item.value).toBe('');
    expect(component.item.invalid).toBeTrue();
  });

  it('should set isEditMode when selectedItem has a url', () => {
    expect(component.isEditMode()).toBeFalse();

    const sel: Item = { id: 42, url: 'https://example.com' };
    fixture.componentRef.setInput('selectedItem', sel);
    fixture.detectChanges();

    expect(component.isEditMode()).toBeTrue();
  });

  it('should sync FormControl value from selectedItem via effect()', () => {
    expect(component.item.value).toBe('');

    fixture.componentRef.setInput('selectedItem', { id: 7, url: 'https://a.dev' });
    fixture.detectChanges();
    expect(component.item.value).toBe('https://a.dev');

    fixture.componentRef.setInput('selectedItem', { id: 8, url: 'https://b.dev' });
    fixture.detectChanges();
    expect(component.item.value).toBe('https://b.dev');

    fixture.componentRef.setInput('selectedItem', undefined);
    fixture.detectChanges();
    expect(component.item.value).toBe('');
  });

  describe('validation', () => {
    it('should show required error when empty', () => {
      component.item.setValue('');
      component.item.markAsTouched();
      component.item.updateValueAndValidity();
      expect(component.item.hasError('required')).toBeTrue();
    });

    it('should set invalidUrl error for malformed URL', () => {
      setItems([]);
      component.item.setValue('not-a-url');
      component.item.updateValueAndValidity();
      expect(component.item.hasError('invalidUrl')).toBeTrue();
    });

    it('should set duplicate error when url exists in items input', () => {
      setItems(['https://dup.me']);
      component.item.setValue('https://dup.me');
      component.item.updateValueAndValidity();
      expect(component.item.hasError('duplicate')).toBeTrue();
    });

    it('should be valid when URL is proper and not in items', () => {
      setItems(['https://other.me']);
      component.item.setValue('https://fresh.me');
      component.item.updateValueAndValidity();
      expect(component.item.valid).toBeTrue();
    });
  });

  describe('flows & outputs', () => {
    it('should emit trimmed url and clear control when onClickAdd is valid', () => {
      const addSpy = jasmine.createSpy('add');
      component.onClickAddEvent.subscribe(addSpy);

      setItems([]);
      component.item.setValue('  https://ok.nz  ');
      component.item.updateValueAndValidity();
      expect(component.item.valid).toBeTrue();

      component.onClickAdd();
      expect(addSpy).toHaveBeenCalledWith('https://ok.nz');
      expect(component.item.value).toBe('');
    });

    it('should mark as touched and not emit when onClickAdd is invalid', () => {
      const addSpy = jasmine.createSpy('add');
      component.onClickAddEvent.subscribe(addSpy);

      component.item.setValue('');
      component.onClickAdd();

      expect(component.item.touched).toBeTrue();
      expect(addSpy).not.toHaveBeenCalled();
    });

    it('should do nothing on onClickUpdate if no selectedItem', () => {
      const updSpy = jasmine.createSpy('upd');
      component.onClickUpdateEvent.subscribe(updSpy);

      component.item.setValue('https://willnot.emit');
      component.onClickUpdate();

      expect(updSpy).not.toHaveBeenCalled();
    });

    it('should emit {id, url} (trimmed) and clear control on onClickUpdate when selected', () => {
      const updSpy = jasmine.createSpy('upd');
      component.onClickUpdateEvent.subscribe(updSpy);

      const sel: Item = { id: 5, url: 'https://old.nz' };
      fixture.componentRef.setInput('selectedItem', sel);
      fixture.detectChanges();

      component.item.setValue('   https://new.nz  ');
      component.onClickUpdate();

      expect(updSpy).toHaveBeenCalledWith({ id: 5, url: 'https://new.nz' });
      expect(component.item.value).toBe('');
    });

    it('should emit once on onClickCancel', () => {
      const cancelSpy = jasmine.createSpy('cancel');
      component.onClickCancelEvent.subscribe(cancelSpy);

      component.onClickCancel();
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });
});
