import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import {
  BreadcrumbsComponent,
  SearchControlsComponent, //recursos
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
} from '@v2/components';

import {
  COURSE_TEXT,
  ARTICLE_TEXT,
  PROJECT_TEXT,
  FINNANCING_TEXT,
  SUPPLIER_TEXT,
  STARTUPS_TEXT,
} from '@v2/constants';

import {
  CharacterizationModelService,
  MaturityModelService,
  ResourceService,
} from '@v2/services';
import { ResourceType } from '@v2/enums';

@Component({
  selector: 'app-general-search',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    SearchControlsComponent,
    SugeridosComponent,
    CommonModule,
    // recursos
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
  templateUrl: './general-search.component.html',
  styleUrls: ['./general-search.component.scss'],
})
export class GeneralSearchComponent implements OnInit {
  private recursosService = inject(ResourceService);
  private modeloMadurezService = inject(MaturityModelService);
  private modeloCaracterService = inject(CharacterizationModelService);
  modeloMadurez = this.modeloMadurezService.modeloMadurez;
  modeloCaracter = this.modeloCaracterService.modeloCaracter;
  public ResourceType = ResourceType;
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

  // sugeridos dentro los resultados
  suggested: any = [];
  private key: Record<ResourceType, string> = {
    [ResourceType.SUPPLIER]: 'sí',
    [ResourceType.COURSE]: '2024',
    [ResourceType.ARTICLE]: '',
    [ResourceType.PROJECT]: '',
    [ResourceType.FINNANCING]: '',
    [ResourceType.STARTUP]: '',
  };

  // Textos dependientes del tipo de recurso
  tips: string[] = [];
  customMessages: string[] = [];
  searchKeywords: string[] = [];
  breadcrumbs: any[] = [];

  // Using the enum for resource type
  resourceType: ResourceType = ResourceType.COURSE;
  labelType: string = 'Cursos';

  // Lista de tipos de recursos disponibles
  resourceOptions = [
    { type: ResourceType.COURSE, label: 'Cursos' },
    { type: ResourceType.ARTICLE, label: 'Artículos' },
    { type: ResourceType.PROJECT, label: 'Proyectos' },
    { type: ResourceType.FINNANCING, label: 'Financiamiento' },
    { type: ResourceType.SUPPLIER, label: 'Proveedores' },
    { type: ResourceType.STARTUP, label: 'Startups' },
  ];

  ngOnInit(): void {
    // Inicializar con el tipo por defecto
    this.initializeTexts();
    this.typeTip();
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.handleSearch(query);
    });
  }

  // Método para cambiar el tipo de recurso a partir de un botón
  setResourceType(type: string): void {
    // "type" es string, así que lo casteamos a ResourceType
    this.resourceType = type as ResourceType;
    this.initializeTexts();
    this.clearSearch();
  }

  initializeTexts(): void {
    // Dependiendo del tipo de recurso seleccionado, configuramos textos
    switch (this.resourceType) {
      case ResourceType.COURSE:
        this.labelType = COURSE_TEXT.LABEL;
        this.tips = COURSE_TEXT.TIPS;
        this.customMessages = COURSE_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = COURSE_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = COURSE_TEXT.BREADCRUMBS;
        break;
      case ResourceType.ARTICLE:
        this.labelType = ARTICLE_TEXT.LABEL;
        this.tips = ARTICLE_TEXT.TIPS;
        this.customMessages = ARTICLE_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = ARTICLE_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = ARTICLE_TEXT.BREADCRUMBS;
        break;
      case ResourceType.PROJECT:
        this.labelType = PROJECT_TEXT.LABEL;
        this.tips = PROJECT_TEXT.TIPS;
        this.customMessages = PROJECT_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = PROJECT_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = PROJECT_TEXT.BREADCRUMBS;
        break;
      case ResourceType.FINNANCING:
        this.labelType = FINNANCING_TEXT.LABEL;
        this.tips = FINNANCING_TEXT.TIPS;
        this.customMessages = FINNANCING_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = FINNANCING_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = FINNANCING_TEXT.BREADCRUMBS;
        break;
      case ResourceType.SUPPLIER:
        this.labelType = SUPPLIER_TEXT.LABEL;
        this.tips = SUPPLIER_TEXT.TIPS;
        this.customMessages = SUPPLIER_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = SUPPLIER_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = SUPPLIER_TEXT.BREADCRUMBS;
        break;
      case ResourceType.STARTUP:
        this.labelType = STARTUPS_TEXT.LABEL;
        this.tips = STARTUPS_TEXT.TIPS;
        this.customMessages = STARTUPS_TEXT.CUSTOM_MESSAGES;
        this.searchKeywords = STARTUPS_TEXT.SEARCH_KEYWORDS;
        this.breadcrumbs = STARTUPS_TEXT.BREADCRUMBS;
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
      this.fetchSuggested();
    }
  }

  async fetchSuggested(): Promise<void> {
    if (
      this.resourceType !== ResourceType.COURSE &&
      this.resourceType !== ResourceType.SUPPLIER
    ) {
      return;
    }

    if (!this.modeloCaracter() && !this.modeloMadurez()) {
      return;
    }

    let query = this.key[this.resourceType];
    if (this.modeloMadurez() && this.modeloMadurez()?.[0]?.IndustryName) {
      query =
        this.modeloMadurez()?.[0]?.IndustryName ?? this.key[this.resourceType];
    }

    this.recursosService
      .searchResources(query, this.resourceType, 3)
      .subscribe({
        next: (data) => {
          this.suggested = data.map((suggestion) => {
            return {
              ...suggestion,
              recomendado: true,
            };
          });
          console.warn(this.suggested);
          this.results = [...this.suggested, ...this.results];
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
          console.warn('Error al obtener los datos:', error);
          this.suggested = [];
        },
      });
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

  // Abrir el modal
  openModal(index: number): void {
    this.currentIndex = index;
    const item = this.results[this.currentIndex];
    this.isModalOpen = true;
    this.dataModal = item;
  }

  closeModal() {
    this.isModalOpen = false;
    this.dataModal = undefined;
  }

  // Mostrar el siguiente elemento en el modal
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
