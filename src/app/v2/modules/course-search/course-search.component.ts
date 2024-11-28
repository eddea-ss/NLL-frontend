import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SugeridosComponent } from '@v2/components';
import { GoogleAnalyticsService, RecursosService } from '@core/services';
import { Course } from '@shared/models/Course.model';
import { CourseItemComponent } from '@v2/components/course-item/course-item.component';
import { CourseModalComponent } from '@v2/components/course-modal/course-modal.component';
import { SearchControlsComponent } from '@v2/components/search-controls/search-controls.component';
import { Breadcrumb } from '@shared/models/breadcrumb.model';
import { BreadcrumbsComponent } from '@v2/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-course-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SugeridosComponent,
    CourseItemComponent,
    CourseModalComponent,
    SearchControlsComponent,
    BreadcrumbsComponent,
  ],
  templateUrl: './course-search.component.html',
  styleUrl: './course-search.component.scss',
})
export class CourseSearchComponent implements OnInit {
  google = inject(GoogleAnalyticsService);
  recursosService = inject(RecursosService);

  //modal
  isModalOpen = false;
  dataModal: any | undefined;
  modal: any;
  currentData: Course[] = [];
  currentIndex: number = 0;

  // Para debounce (efecto de tipado)
  tipIndex: number = 0;
  charIndex: number = 0;
  typingSpeed: number = 50; // ms
  tipDelay: number = 3000; // ms
  typingTimeout: any;
  isUserTyping: boolean = false;
  private searchSubject: Subject<string> = new Subject();

  //variables de manejo busqueda
  searchTip: string = '';
  searchMessage: string = '';
  searchInput: string = '';
  resultCount: string = '';
  isLoading: boolean = false;
  results: Course[] = [];

  // Para el efecto de escritura de tips y claves sugeridas
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
  searchKeywords: string[] = [
    'online',
    'presencial',
    'gratuito',
    'de pago',
    'ingles',
  ];
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Inicio',
      url: '/',
      icon: 'M10 2L2 7h3v7h4v-5h2v5h4V7h3L10 2z', // Ruta del icono SVG
    },
    {
      label: 'Buscadores',
      url: '/buscadores',
    },
    {
      label: 'Cursos',
      url: '/buscadores/cursos',
      isActive: true, // Indica que es la página actual
    },
  ];

  ngOnInit(): void {
    this.typeTip();
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.handleSearch(query);
    });
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
      const response: Course[] = await this.recursosService.fetchResults(
        query,
        'curses'
      );
      this.displayResults(response, query);
    } catch (error) {
      console.warn('Error al obtener los datos:', error);
      this.results = [];
      this.resultCount = 'Error al obtener los datos.';
    } finally {
      this.isLoading = false;
    }
  }

  // Mostrar los resultados de búsqueda en el DOM
  displayResults(data: Course[], query: string): void {
    this.currentData = data;
    this.results = this.currentData;
    this.resultCount = `${this.currentData.length} resultado${
      this.currentData.length !== 1 ? 's' : ''
    } para "${query}"`;

    if (this.currentData.length === 0) {
      this.resultCount = 'No se encontraron resultados.';
    }
  }

  // Abrir el modal con los detalles del curso seleccionado
  openModal(index: number): void {
    this.currentIndex = index;
    const item = this.currentData[this.currentIndex];
    this.isModalOpen = true;
    this.dataModal = item;
  }

  closeModal() {
    this.isModalOpen = false;
    this.dataModal = undefined;
  }

  // Mostrar el siguiente curso en el modal
  showNextItem(): void {
    if (this.currentData.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.currentData.length;
    this.openModal(this.currentIndex);
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

  // Manejar accesibilidad por teclado para términos sugeridos
  handleKeyPress(event: KeyboardEvent, term: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.addSuggestedTerm(term);
    }
  }
}
