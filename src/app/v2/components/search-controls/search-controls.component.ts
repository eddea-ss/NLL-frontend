import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-controls',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-controls.component.html',
  styleUrls: ['./search-controls.component.scss'],
})
export class SearchControlsComponent {
  @Input() searchTip: string = '';
  @Input() searchMessage: string = '';
  @Input() searchInput: string = '';
  @Input() searchKeywords: string[] = [];
  @Input() resultCount: string = '';
  @Input() isLoading: boolean = false;

  @Output() searchInputChange = new EventEmitter<string>();
  @Output() clearSearch = new EventEmitter<void>();
  @Output() addSuggestedTerm = new EventEmitter<string>();
  @Output() triggerSearch = new EventEmitter<void>();

  onInputChange(value: string): void {
    this.searchInputChange.emit(value);
  }

  onClearSearch(): void {
    this.clearSearch.emit();
  }

  onAddSuggestedTerm(term: string): void {
    this.addSuggestedTerm.emit(term);
  }

  onSearch(): void {
    this.triggerSearch.emit();
  }

  handleKeyPress(event: KeyboardEvent, term: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onAddSuggestedTerm(term);
    }
  }
}
