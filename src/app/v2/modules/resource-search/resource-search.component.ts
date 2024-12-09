import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  //recursos
  CourseItemComponent,
  CourseModalComponent,
  FinancingModalComponent,
  StartupModalComponent,
  SugeridosComponent,
  SupplierModalComponent,
  ArticleItemComponent,
  ArticleModalComponent,
  ProjectsItemComponent,
  FinancingItemComponent,
  SupplierItemComponent,
  StartupItemComponent,
  ProjectsModalComponent,
  //controlador
  SearchControlsComponent,
  BreadcrumbsComponent,
} from '@v2/components';
import { GoogleAnalyticsService, ResourceService } from '@v2/services';
import {
  COURSE_TEXT,
  ARTICLE_TEXT,
  PROJECT_TEXT,
  FINNANCING_TEXT,
  SUPPLIER_TEXT,
  STARTUPS_TEXT,
} from '@v2/constants';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resource-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SugeridosComponent,
    SearchControlsComponent,
    BreadcrumbsComponent,
    //recursos
    CourseItemComponent,
    CourseModalComponent,
    ArticleItemComponent,
    ArticleModalComponent,
    ProjectsItemComponent,
    ProjectsModalComponent,
    FinancingItemComponent,
    FinancingModalComponent,
    SupplierItemComponent,
    SupplierModalComponent,
    StartupItemComponent,
    StartupModalComponent,
  ],
  templateUrl: './resource-search.component.html',
  styleUrl: './resource-search.component.scss',
})
export class ResourceSearchComponent implements OnInit {
  google = inject(GoogleAnalyticsService);
  recursosService = inject(ResourceService);
  route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  // Modal variables
  isModalOpen = false;
  dataModal: any | undefined;
  currentData: any[] = [];
  currentIndex: number = 0;

  // Debounce variables
  tipIndex: number = 0;
  charIndex: number = 0;
  typingSpeed: number = 50; // ms
  tipDelay: number = 3000; // ms
  typingTimeout: any;
  isUserTyping: boolean = false;
  private searchSubject: Subject<string> = new Subject();

  // Search handling variables
  searchTip: string = '';
  searchMessage: string = '';
  searchInput: string = '';
  resultCount: string = '';
  isLoading: boolean = false;
  results: any[] = [];

  // Texts for tips and suggested keywords
  tips: string[] = [];
  customMessages: string[] = [];
  searchKeywords: string[] = [];
  breadcrumbs: any[] = [];
  resourceType: string = '';
  labelType: string = '';

  ngOnInit(): void {
    this.title.setTitle('Buscador de Recursos | Nuevo Los Lagos');
    // Add meta tags
    this.meta.updateTag({
      name: 'description',
      content:
        'Accede a cursos, artículos y opciones de financiamiento diseñados para impulsar tu negocio. Encuentra recursos clave en un solo lugar con nuestro buscador.',
    });
    this.route.data.subscribe((data) => {
      this.resourceType = data['resourceType'];
      this.labelType = data['label'];
      this.initializeTexts();
      this.typeTip();
      this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
        this.handleSearch(query);
      });
    });
  }

  initializeTexts(): void {
    switch (this.resourceType) {
      case 'curses':
        this.labelType = COURSE_TEXT.LABEL;
        this.tips = COURSE_TEXT.TIPS;
        this.customMessages = COURSE_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = COURSE_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = COURSE_TEXT.BREADCRUMBS;
        break;
      case 'articles':
        this.labelType = ARTICLE_TEXT.LABEL;
        this.tips = ARTICLE_TEXT.TIPS;
        this.customMessages = ARTICLE_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = ARTICLE_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = ARTICLE_TEXT.BREADCRUMBS;
        break;
      case 'projects':
        this.labelType = PROJECT_TEXT.LABEL;
        this.tips = PROJECT_TEXT.TIPS;
        this.customMessages = PROJECT_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = PROJECT_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = PROJECT_TEXT.BREADCRUMBS;
        break;
      case 'financing':
        this.labelType = FINNANCING_TEXT.LABEL;
        this.tips = FINNANCING_TEXT.TIPS;
        this.customMessages = FINNANCING_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = FINNANCING_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = FINNANCING_TEXT.BREADCRUMBS;
        break;
      case 'suppliers':
        this.labelType = SUPPLIER_TEXT.LABEL;
        this.tips = SUPPLIER_TEXT.TIPS;
        this.customMessages = SUPPLIER_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = SUPPLIER_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = SUPPLIER_TEXT.BREADCRUMBS;
        break;
      case 'startups':
        this.labelType = STARTUPS_TEXT.LABEL;
        this.tips = STARTUPS_TEXT.TIPS;
        this.customMessages = STARTUPS_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = STARTUPS_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = STARTUPS_TEXT.BREADCRUMBS;
        break;
      default:
        break;
    }
  }

  // Efecto de máquina de escribir para los tips
  typeTip(): void {
    if (!this.tips) {
      return;
    }
    if (this.tipIndex >= this.tips?.length) this.tipIndex = 0;
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

  // Realizar la búsqueda de recursos según la consulta
  async fetchResults(query: string): Promise<void> {
    if (query.length < 2) {
      this.results = [];
      this.resultCount = '';
      return;
    }

    try {
      this.isLoading = true;
      const response: any[] = await this.recursosService.fetchResults(
        query,
        this.resourceType
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
  displayResults(data: any[], query: string): void {
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
