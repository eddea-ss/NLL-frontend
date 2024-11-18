import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import DOMPurify from 'dompurify';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SugeridosComponent } from '@v2/components';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

interface Course {
  titulo: string;
  descripcion: string;
  link: string;
  entidad: string;
  plataforma: string;
  idioma: string;
  tipo: string; // 'de pago' o 'gratuito'
  modalidad: string; // 'online' o 'presencial'
  nivel: string;
  duracion: string;
  tipo_de_conocimiento: string[];
}

declare var bootstrap: any;
@Component({
  selector: 'app-course-search',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SugeridosComponent,
    TruncatePipe,
  ],
  templateUrl: './course-search.component.html',
  styleUrl: './course-search.component.scss',
})
export class CourseSearchComponent implements OnInit, AfterViewInit {
  searchTip: string = '';
  searchMessage: string = '';
  searchInput: string = '';
  resultCount: string = '';
  isLoading: boolean = false;
  results: Course[] = [];

  // Para el efecto de escritura de tips
  tips: string[] = [
    '¿Sabías que puedes buscar cursos por "online" o "presencial"?',
    'Prueba buscar "gestión de proyectos" para encontrar cursos relacionados.',
    'Puedes combinar palabras clave para refinar tus resultados, por ejemplo, "calidad alimentaria".',
    'Agrega "gratuito" al final de tu búsqueda para encontrar cursos sin costo, por ejemplo, "seguridad alimentaria gratuito".',
  ];
  customMessages: string[] = [
    '¡Espero que encuentres el curso que buscas!',
    '¡Buena suerte en tu aprendizaje!',
    '¡Éxito en tu búsqueda de formación!',
    '¡Que encuentres cursos interesantes!',
    '¡Que la educación te acompañe!',
    '¡Que tengas un excelente descubrimiento de cursos!',
  ];
  tipIndex: number = 0;
  charIndex: number = 0;
  typingSpeed: number = 50; // ms
  tipDelay: number = 3000; // ms
  typingTimeout: any;
  isUserTyping: boolean = false;

  // Para debounce
  private searchSubject: Subject<string> = new Subject();

  // Modal
  @ViewChild('courseModal') modalElement!: ElementRef;
  modal: any;
  currentData: Course[] = [];
  currentIndex: number = 0;

  constructor(private http: HttpClient, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.typeTip();
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.handleSearch(query);
    });
  }

  ngAfterViewInit(): void {
    // Inicializar el modal después de que la vista haya sido inicializada
    //this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
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

  // Realizar la búsqueda de cursos según la consulta
  async fetchResults(query: string): Promise<void> {
    if (query.length < 2) {
      this.results = [];
      this.resultCount = '';
      return;
    }

    try {
      this.isLoading = true;
      const response = await fetch(
        `https://control.nuevoloslagos.org/curses/search?search=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) throw new Error('Error en la solicitud');
      const data: Course[] = await response.json();
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
  displayResults(data: Course[], query: string): void {
    this.currentData = this.sortResults(data);
    this.results = this.currentData;
    this.resultCount = `${this.currentData.length} resultado${
      this.currentData.length !== 1 ? 's' : ''
    } para "${query}"`;

    if (this.currentData.length === 0) {
      this.resultCount = 'No se encontraron resultados.';
    }
  }

  // Ordenar los resultados por nivel de importancia
  sortResults(data: Course[]): Course[] {
    const nivelOrder: { [key: string]: number } = {
      Avanzado: 1,
      Intermedio: 2,
      Básico: 3,
    };
    return data.sort((a, b) => {
      return (nivelOrder[a.nivel] || 4) - (nivelOrder[b.nivel] || 4);
    });
  }

  // Abrir el modal con los detalles del curso seleccionado
  openModal(index: number): void {
    this.currentIndex = index;
    const item = this.currentData[this.currentIndex];

    const modalTitle = this.elRef.nativeElement.querySelector('#modalTitle');
    const modalEntidad =
      this.elRef.nativeElement.querySelector('#modalEntidad');
    const modalIdioma = this.elRef.nativeElement.querySelector('#modalIdioma');
    const modalTipoPago =
      this.elRef.nativeElement.querySelector('#modalTipoPago');
    const modalTipoGratuito =
      this.elRef.nativeElement.querySelector('#modalTipoGratuito');
    const modalModalidad =
      this.elRef.nativeElement.querySelector('#modalModalidad');
    const modalModalidadOnline = this.elRef.nativeElement.querySelector(
      '#modalModalidadOnline'
    );
    const modalNivel = this.elRef.nativeElement.querySelector('#modalNivel');
    const modalDuracion =
      this.elRef.nativeElement.querySelector('#modalDuracion');
    const modalDescripcion =
      this.elRef.nativeElement.querySelector('#modalDescripcion');
    const modalTipoConocimiento = this.elRef.nativeElement.querySelector(
      '#modalTipoConocimiento'
    );
    const modalLink = this.elRef.nativeElement.querySelector('#modalLink');

    modalTitle.textContent = item.titulo;
    modalEntidad.textContent = `Entidad: ${item.entidad}`;
    modalIdioma.textContent = `Idioma: ${this.capitalizeFirstLetter(
      item.idioma
    )}`;
    modalTipoPago.textContent = `Tipo: De Pago`;
    modalTipoGratuito.textContent = `Tipo: Gratuito`;
    modalModalidad.textContent = `Modalidad: ${this.capitalizeFirstLetter(
      item.modalidad
    )}`;
    modalModalidadOnline.textContent = `Modalidad: Online`;
    modalNivel.textContent = `Nivel: ${item.nivel}`;
    modalDuracion.textContent = `Duración: ${item.duracion}`;
    modalDescripcion.innerHTML = `<strong>Descripción:</strong><br>${DOMPurify.sanitize(
      item.descripcion
    ).replace(/\r\n/g, '<br><br>')}`;

    modalTipoConocimiento.textContent = `Tipo de Conocimiento: ${item.tipo_de_conocimiento.join(
      ', '
    )}`;
    modalLink.href = item.link;

    // Mostrar u ocultar etiquetas según los datos
    modalIdioma.classList.toggle(
      'd-none',
      item.idioma.toLowerCase() !== 'ingles'
    );
    modalTipoPago.classList.toggle(
      'd-none',
      item.tipo.toLowerCase() !== 'de pago'
    );
    modalTipoGratuito.classList.toggle(
      'd-none',
      item.tipo.toLowerCase() === 'de pago'
    );
    modalModalidad.classList.toggle(
      'd-none',
      item.modalidad.toLowerCase() !== 'presencial'
    );
    modalModalidadOnline.classList.toggle(
      'd-none',
      item.modalidad.toLowerCase() !== 'online'
    );
    modalNivel.classList.toggle('d-none', !item.nivel);
    modalDuracion.classList.toggle('d-none', !item.duracion);
    this.modal.show();
  }

  // Mostrar el siguiente curso en el modal
  showNextCourse(): void {
    if (this.currentData.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.currentData.length;
    this.openModal(this.currentIndex);
  }

  // Capitalizar la primera letra de una cadena
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Obtener el dominio de una URL
  getDomain(url: string): string {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'URL inválida';
    }
  }

  // Mostrar un mensaje de búsqueda personalizado
  showSearchMessage(): void {
    const randomMessage =
      this.customMessages[
        Math.floor(Math.random() * this.customMessages.length)
      ];
    this.searchMessage = randomMessage;
  }

  // Ocultar el mensaje de búsqueda personalizado
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
  }

  // Alternar la visibilidad del botón de limpiar (opcional, se maneja en la plantilla)
  toggleClearButton(): void {
    // Esta función se puede manejar en la plantilla con *ngIf basado en searchInput
  }

  // Manejar accesibilidad por teclado para términos sugeridos
  handleKeyPress(event: KeyboardEvent, term: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.addSuggestedTerm(term);
    }
  }

  // Sanitizar la descripción del curso
  sanitizedDescripcion(descripcion: string): string {
    return DOMPurify.sanitize(descripcion);
  }
}
