import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-controls',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-controls.component.html',
  styleUrls: ['./search-controls.component.scss'],
})
export class SearchControlsComponent implements OnChanges {
  // Mensajes dinámicos para indicar consejos o estado actual de la búsqueda
  @Input() searchTip: string = '';
  @Input() searchMessage: string = '';
  
  // Estado de la animación
  isTypingVisible: boolean = false;
  private typingTimeout: any;
  
  // Valor actual del campo de búsqueda
  @Input() searchInput: string = '';
  
  // Términos sugeridos que el usuario puede agregar fácilmente a la búsqueda
  @Input() searchKeywords: string[] = [];
  
  // Conteo de resultados
  @Input() resultCount: string = '';
  
  // Indica si se está realizando una carga
  @Input() isLoading: boolean = false;
  
  // Lista de tipos de recursos y selección actual
  @Input() resourceOptions: { type: string; label: string }[] = [];
  @Input() selectedResourceType: string = 'all';
  
  // Eventos
  @Output() searchInputChange = new EventEmitter<string>();
  @Output() clearSearch = new EventEmitter<void>();
  @Output() addSuggestedTerm = new EventEmitter<string>();
  @Output() triggerSearch = new EventEmitter<void>();
  @Output() resourceTypeChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    // Manejar cambios en searchTip y searchMessage
    if (changes['searchTip'] || changes['searchMessage']) {
      // Limpiar timeout anterior si existe
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      
      // Ocultar mensaje actual
      this.isTypingVisible = false;
      
      // Mostrar nuevo mensaje con una pequeña demora para la animación
      this.typingTimeout = setTimeout(() => {
        this.isTypingVisible = true;
      }, 100);
    }
  }

  // Actualiza el valor de búsqueda y notifica al componente padre
  onInputChange(value: string): void {
    this.searchInputChange.emit(value);
  }

  // Pide al componente padre que limpie la búsqueda actual
  onClearSearch(): void {
    this.clearSearch.emit();
  }

  // Agrega un término sugerido a la búsqueda con animación
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

  // Cambia el tipo de recurso seleccionado con transición suave
  onResourceTypeChange(type: string): void {
    this.resourceTypeChange.emit(type);
  }

  // Método auxiliar para mostrar los botones
  get showResourceButtons(): boolean {
    return this.resourceOptions.length > 0;
  }

  // Limpieza al destruir el componente
  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }
}
