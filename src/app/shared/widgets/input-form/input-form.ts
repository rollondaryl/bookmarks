import { Component, computed, effect, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Constants } from '../../constants/constants';
import { inputValidator } from '../../validators/validator';
import { Item } from '../../models/item';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-form.html',
  styleUrl: './input-form.scss',
})
export class InputForm {
  // Shared constants
  readonly constants = Constants;

  // Whether we're editing an existing bookmark (derived from selectedItem)
  readonly isEditMode = computed(() => !!this.selectedItem()?.url);

  // Full list used by validator to detect duplicates
  readonly items = input<Array<{ id: number; url: string }>>([]);

  // The item under edit (optional to allow "add new" flow)
  readonly selectedItem = input<Item | undefined>();

  // Button label
  readonly buttonText = input<string>('');

  // Outbound events to parent
  readonly onClickAddEvent = output<string>();
  readonly onClickUpdateEvent = output<Item>();
  readonly onClickCancelEvent = output<void>();

  // Single URL form control with duplicate + required checks
  readonly item = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, inputValidator(() => this.items())],
  });

  // Keep control in sync when selection changes; empty if none selected
  private readonly _sync = effect(() => {
    this.item.setValue(this.selectedItem()?.url ?? '', { emitEvent: false });
  });

  // Add flow
  onClickAdd() {
    if (this.item.invalid) { this.item.markAsTouched(); return; }
    this.onClickAddEvent.emit(this.item.value.trim());
    this.item.reset(''); // clear after submit
  }

  // Cancel/clear
  onClickCancel() {
    this.onClickCancelEvent.emit();
  }

  // Update flow (id comes from the selected item; url from control)
  onClickUpdate() {
    const current = this.selectedItem();
    if (!current) return; // guard: no selection, nothing to update

    this.onClickUpdateEvent.emit({ id: current.id, url: this.item.value.trim() });
    this.item.reset('');
  }
}
