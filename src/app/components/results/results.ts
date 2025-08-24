import { Component, computed, input, output } from '@angular/core';
import { Constants } from '../../shared/constants/constants';
import { Card } from '../../shared/widgets';

@Component({
  selector: 'app-results',
  imports: [Card],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
   // Shared constants
  readonly constants = Constants;

  // The URL that was just added (empty when nothing new)
  readonly newlyAddedURL = input<string>('');

  // Notifies parent to navigate back
  readonly goBackEvent = output<void>();

  // Render-ready message for the newly added bookmark
  readonly newBookmark = computed(() =>
    this.constants.RESULTS_HAS_BEEN_ADDED.replace('{new}', this.newlyAddedURL() || 'the bookmark')
  );

  // Emit the "back" intent to the parent
  goBack() {
    this.goBackEvent.emit();
  }
}
