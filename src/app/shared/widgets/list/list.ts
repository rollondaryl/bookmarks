import { Component, input, output, signal } from '@angular/core';
import { InputForm } from '../input-form/input-form';
import { Constants } from '../../constants/constants';
import { Item } from '../../models/item';

@Component({
  selector: 'app-list',
  imports: [InputForm],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  // Shared constants
  readonly constants = Constants;

  // UI copy for the "empty" state
  emptyMessage = input<string>('');

  // Full list of items to render
  items = input<Item[]>([]);

  // Currently selected item (undefined means "no selection")
  selectedItem = signal<Item | undefined>(undefined);

  // Outbound events
  onSelectEvent = output<Item>(); // when user picks an item
  onDeleteEvent = output<Item>();
  onCancelEvent = output<void>();
  onUpdateEvent = output<Item>();

  // Update flow: clear selection and bubble the updated value
  onUpdate(bookmark: Item) {
    this.selectedItem.set(undefined);
    this.onUpdateEvent.emit(bookmark);
  }

  // Select an item (and notify parent if needed)
  onSelect(bookmark: Item) {
    this.selectedItem.set(bookmark);
    this.onSelectEvent.emit(bookmark);
  }

  // Delete an item
  onDelete(bookmark: Item) {
    this.onDeleteEvent.emit(bookmark);
  }

  // Cancel edit/selection
  onCancel() {
    this.selectedItem.set(undefined);
    this.onCancelEvent.emit();
  }
}
