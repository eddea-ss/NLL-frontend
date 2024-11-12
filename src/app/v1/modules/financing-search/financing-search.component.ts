import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import DOMPurify from 'dompurify';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface Financing {
  titulo: string;
  descripcion: string;
  link: string;
  institucion: string;
  categoria: string;
  tipo_financiamiento: string;
  monto_subsidio: string;
  porcentaje_cobertura: string;
  existe_plazo: string;
  plazo: string;
  nivel_de_complejidad_: string;
}

declare var bootstrap: any; // Declaración global para Bootstrap

@Component({
  selector: 'app-financing-search',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './financing-search.component.html',
  styleUrls: ['./financing-search.component.scss']
})
export class FinancingSearchComponent implements OnInit, AfterViewInit {
  searchTip: string = '';
  searchMessage: string = '';
  searchInput: string = '';
  resultCount: string = '';
  isLoading: boolean = false;
  results: Financing[] = [];

  // Para el efecto de escritura de tips
  tips: string[] = [
    '¿Sabías que puedes buscar "innovación" o "sostenibilidad"?',
    'Prueba buscar "tecnologías climáticas" para encontrar financiamientos específicos.',
    'Puedes combinar palabras clave para refinar tus resultados, por ejemplo, "publico innovación".',
    'Agrega "medio" al final de tu búsqueda para encontrar financiamientos de nivel medio, por ejemplo, "innovación medio".',
  ];
  customMessages: string[] = [
    '¡Espero que encuentres el financiamiento que buscas!',
    '¡Buena suerte en tu búsqueda de financiamiento!',
    '¡Éxito en tu búsqueda de oportunidades de financiamiento!',
    '¡Que encuentres convocatorias interesantes!',
    '¡Que el financiamiento te acompañe!',
    '¡Que tengas un excelente descubrimiento de financiamientos!'
  ];
  tipIndex: number = 0;
  charIndex: number = 0;
  typingSpeed: number = 50; // ms
  tipDelay: number = 3000;  // ms
  typingTimeout: any;
  isUserTyping: boolean = false;

  // Para debounce
  private searchSubject: Subject<string> = new Subject();

  // Financiamiento seleccionado para mostrar en el modal
  selectedFinancing: Financing | null = null;

  // ViewChild para el modal
  @ViewChild('financingModal') modalElement!: ElementRef;
  modalInstance: any;
  currentIndex: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.typeTip();
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.handleSearch(query);
    });
  }

  ngAfterViewInit(): void {
    // Inicializar el modal después de que la vista haya sido inicializada
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  // Efecto de máquina de escribir para los tips
  typeTip(): void {
    if (this.tipIndex >= this.tips.length) this.tipIndex = 0;
    const currentTip = this.tips[this.tipIndex];

    if (this.charIndex < currentTip.length) {
      this.searchTip += currentTip.charAt(this.charIndex);
      this.charIndex++;
      this.typingTimeout = setTimeout(() => this.typeTip(), this.typingSpeed);
    } else {
      // Esperar antes de mostrar el siguiente tip
      this.typingTimeout = setTimeout(() => {
        this.searchTip = '';
        this.charIndex = 0;
        this.tipIndex++;
        this.typeTip();
      }, this.tipDelay);
    }
  }

  // Manejar cambios en el campo de búsqueda con debounce
  onSearchInputChange(): void {
    this.searchSubject.next(this.searchInput.trim().toLowerCase());
    this.toggleClearButton();
  }

  handleSearch(query: string): void {
    if (query.length >= 2) {
      if (!this.isUserTyping) {
        this.isUserTyping = true;
        this.showSearchMessage();
      }
      this.fetchResults(query);
    } else {
      this.results = [];
      this.resultCount = '';
      if (this.isUserTyping) {
        this.isUserTyping = false;
        this.hideSearchMessage();
        this.searchTip = '';
        clearTimeout(this.typingTimeout);
        this.typeTip();
      }
    }
  }

  // Realizar la búsqueda de financiamientos según la consulta
  async fetchResults(query: string): Promise<void> {
    if (query.length < 2) {
      this.results = [];
      this.resultCount = '';
      return;
    }

    try {
      this.isLoading = true;
      const response = await fetch(`https://control.nuevoloslagos.org/financing/search?search=${encodeURIComponent(query)}`);
      const data: Financing[] = await response.json();
      this.displayResults(data, query);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      this.results = [];
      this.resultCount = 'Error al obtener los datos.';
    } finally {
      this.isLoading = false;
    }
  }

  // Mostrar los resultados de búsqueda en el DOM
  displayResults(data: Financing[], query: string): void {
    this.results = this.sortResults(data);
    this.resultCount = `${this.results.length} resultado${this.results.length !== 1 ? 's' : ''} para "${query}"`;

    if (this.results.length === 0) {
      this.resultCount = 'No se encontraron resultados.';
    }
  }

  // Ordenar los resultados por existencia de plazo y monto del subsidio
  sortResults(data: Financing[]): Financing[] {
    return data.sort((a, b) => {
      // Primero los que tienen plazo
      if (a.existe_plazo.toLowerCase() === 'si' && b.existe_plazo.toLowerCase() !== 'si') return -1;
      if (a.existe_plazo.toLowerCase() !== 'si' && b.existe_plazo.toLowerCase() === 'si') return 1;
      
      // Luego por monto de subsidio (asumiendo que es numérico o rango)
      const montoA = this.parseMonto(a.monto_subsidio);
      const montoB = this.parseMonto(b.monto_subsidio);
      return montoB - montoA;
    });
  }

  // Convierte el campo "monto_subsidio" a un valor numérico para ordenación
  parseMonto(monto: string): number {
    if (monto === "Sin especificar" || monto === "No especificado") return 0;
    // Extraer números y convertir a entero
    const numbers = monto.replace(/[^\d]/g, '');
    return parseInt(numbers) || 0;
  }

  // Abrir el modal con los detalles del financiamiento seleccionado
  openModal(financing: Financing): void {
    this.selectedFinancing = financing;
    this.currentIndex = this.results.indexOf(financing);
    this.modalInstance.show();
  }

  // Mostrar el siguiente financiamiento en el modal
  showNextFinancing(): void {
    if (this.results.length === 0 || !this.selectedFinancing) return;
    this.currentIndex = (this.currentIndex + 1) % this.results.length;
    this.selectedFinancing = this.results[this.currentIndex];
  }

  // Capitalizar la primera letra de una cadena
  capitalizeFirstLetter(string: string): string {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Convertir una cadena de fecha 'YYYYMMDD' a formato 'DD/MM/YYYY'
  convertToDate(dateString: string): string | null {
    if (!dateString || dateString.length !== 8) return null;
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) return null;
    const dayFormatted = String(date.getDate()).padStart(2, '0');
    const monthFormatted = String(date.getMonth() + 1).padStart(2, '0');
    const yearFormatted = date.getFullYear();
    return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
  }

  // Sanitizar la descripción del financiamiento
  sanitizedDescripcion(descripcion: string): string {
    return DOMPurify.sanitize(descripcion);
  }

  // Mostrar un mensaje personalizado de buena suerte
  showSearchMessage(): void {
    const randomMessage = this.customMessages[Math.floor(Math.random() * this.customMessages.length)];
    this.searchMessage = randomMessage;
  }

  // Ocultar el mensaje personalizado de buena suerte
  hideSearchMessage(): void {
    this.searchMessage = '';
  }

  // Agregar una palabra clave sugerida al campo de búsqueda
  addSuggestedTerm(term: string): void {
    const currentValue = this.searchInput.trim();
    const separator = currentValue.length > 0 ? ' ' : '';
    this.searchInput = `${currentValue}${separator}${term}`;
    this.onSearchInputChange();
  }

  // Limpiar el campo de búsqueda y los resultados
  clearSearch(): void {
    this.searchInput = '';
    this.results = [];
    this.resultCount = '';
    this.hideSearchMessage();
    this.searchTip = '';
    clearTimeout(this.typingTimeout);
    this.typeTip();
    this.toggleClearButton();
  }

  // Alternar la visibilidad del botón de limpiar
  toggleClearButton(): void {
    // Esta función se puede manejar en la plantilla con *ngIf basado en searchInput
  }

  // Manejar accesibilidad por teclado para términos sugeridos
  handleKeyPress(event: KeyboardEvent, term: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.addSuggestedTerm(term);
    }
  }
}
