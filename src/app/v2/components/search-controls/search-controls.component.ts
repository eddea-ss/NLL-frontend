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
  // Mensajes dinámicos para indicar consejos o estado actual de la búsqueda
  @Input() searchTip: string = '';
  @Input() searchMessage: string = '';
  
  // Valor actual del campo de búsqueda
  @Input() searchInput: string = '';
  
  // Términos sugeridos que el usuario puede agregar fácilmente a la búsqueda
  @Input() searchKeywords: string[] = [];
  
  // Conteo de resultados (en texto), por ejemplo "10 resultados encontrados"
  @Input() resultCount: string = '';
  
  // Indica si se está realizando una carga (ej: buscando resultados)
  @Input() isLoading: boolean = false;

  // Eventos para notificar cambios o acciones al componente padre
  @Output() searchInputChange = new EventEmitter<string>();
  @Output() clearSearch = new EventEmitter<void>();
  @Output() addSuggestedTerm = new EventEmitter<string>();
  @Output() triggerSearch = new EventEmitter<void>();

  // Actualiza el valor de búsqueda y notifica al componente padre
  onInputChange(value: string): void {
    this.searchInputChange.emit(value);
  }

  // Pide al componente padre que limpie la búsqueda actual
  onClearSearch(): void {
    this.clearSearch.emit();
  }

  // Agrega un término sugerido a la búsqueda
  onAddSuggestedTerm(term: string): void {
    this.addSuggestedTerm.emit(term);
  }

  // Lanza el evento para realizar la búsqueda actual
  onSearch(): void {
    this.triggerSearch.emit();
  }

  // Permite agregar término sugerido con Enter o Espacio para accesibilidad
  handleKeyPress(event: KeyboardEvent, term: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onAddSuggestedTerm(term);
    }
  }
}