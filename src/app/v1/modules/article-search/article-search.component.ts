import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import DOMPurify from 'dompurify';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface Article {
  titulo: string;
  resumen: string;
  link: string;
  fecha_publicacion: string;
  idioma: string;
  articulo_paper: string;
  nivel: string;
}

@Component({
  selector: 'app-article-search',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent implements OnInit, AfterViewInit {
  searchTip = '';
  searchMessage = '';
  searchInput = '';
  resultCount = '';
  isLoading = false;
  results: Article[] = [];
  
  // For the typing effect
  tips: string[] = [
    '¿Sabías que puedes buscar "IoT 2024" o "IoT inglés"?',
    'Prueba buscar "peces" y descubre artículos con conceptos relacionados.',
    'Puedes combinar palabras clave para refinar tus resultados, por ejemplo, "IoT seguridad".',
    'Agrega "paper" al final de tu búsqueda para encontrar papers, por ejemplo, "iot paper".',
  ];
  customMessages: string[] = [
    '¡Espero que tengas suerte con tu búsqueda!',
    '¡Buena suerte encontrando lo que necesitas!',
    '¡Éxito en tu búsqueda de información!',
    '¡Que encuentres artículos interesantes!',
    '¡Que la información te acompañe!',
    '¡Que tengas un excelente descubrimiento!'
  ];
  tipIndex = 0;
  charIndex = 0;
  typingSpeed = 50; // ms
  tipDelay = 3000;  // ms
  typingTimeout: any;
  isUserTyping = false;

  // For debounce
  private searchSubject = new Subject<string>();

  // Modal
  @ViewChild('articleModal') modalElement!: ElementRef;
  modal: any;
  currentData: Article[] = [];
  currentIndex = 0;

  constructor(private http: HttpClient, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.typeTip();
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.handleSearch(query);
    });

    // Initialize Bootstrap modal
    // @ts-ignore
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  // Typing effect for tips
  typeTip(): void {
    if (this.tipIndex >= this.tips.length) this.tipIndex = 0;
    const currentTip = this.tips[this.tipIndex];

    if (this.charIndex < currentTip.length) {
      this.searchTip += currentTip.charAt(this.charIndex);
      this.charIndex++;
      this.typingTimeout = setTimeout(() => this.typeTip(), this.typingSpeed);
    } else {
      // Wait before showing the next tip
      this.typingTimeout = setTimeout(() => {
        this.searchTip = '';
        this.charIndex = 0;
        this.tipIndex++;
        this.typeTip();
      }, this.tipDelay);
    }
  }

  // Handle search input with debounce
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

  // Fetch results from API
  fetchResults(query: string): void {
    this.isLoading = true;
    this.http.get<Article[]>(`https://control.nuevoloslagos.org/articles/search?search=${encodeURIComponent(query)}`)
      .subscribe({
        next: (data) => {
          this.results = this.sortResults(data);
          this.resultCount = `${this.results.length} resultado${this.results.length !== 1 ? 's' : ''} para "${query}"`;
          if (this.results.length === 0) {
            this.resultCount = 'No se encontraron resultados.';
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
          this.resultCount = 'Error al obtener los datos.';
          this.results = [];
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  // Sort results by date and importance
  sortResults(data: Article[]): Article[] {
    const nivelOrder: Record<string, number> = { 'Muy alto': 1, 'Alto': 2, 'Medio': 3, 'Bajo': 4, 'Muy bajo': 5 };
    return data.sort((a, b) => {
      const dateA = this.convertToDate(a.fecha_publicacion);
      const dateB = this.convertToDate(b.fecha_publicacion);
      if (dateB.getTime() !== dateA.getTime()) return dateB.getTime() - dateA.getTime();
      return (nivelOrder[a.nivel] || 6) - (nivelOrder[b.nivel] || 6);
    });
  }

  // Convert date string to Date object
  convertToDate(dateString: string): Date {
    if (dateString.length !== 8) {
      console.warn(`Formato de fecha inesperado: ${dateString}`);
      return new Date(0); // Fecha por defecto
    }
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return new Date(`${year}-${month}-${day}`);
  }

  // Display modal with article details
  openModal(index: number): void {
    this.currentIndex = index;
    const item = this.results[this.currentIndex];

    // Populate modal fields
    const modalTitle = this.elRef.nativeElement.querySelector('#modalTitle');
    const modalDate = this.elRef.nativeElement.querySelector('#modalDate');
    const modalSummary = this.elRef.nativeElement.querySelector('#modalSummary');
    const modalOrigin = this.elRef.nativeElement.querySelector('#modalOrigin');
    const modalLanguage = this.elRef.nativeElement.querySelector('#modalLanguage');
    const modalLink = this.elRef.nativeElement.querySelector('#modalLink');

    modalTitle.textContent = item.titulo;
    modalDate.textContent = `Año de publicación: ${this.convertToDate(item.fecha_publicacion).getFullYear()}`;
    modalSummary.innerHTML = DOMPurify.sanitize(item.resumen.replace(/\. /g, '.<br><br>'));
    modalLink.href = item.link;
    modalOrigin.textContent = `Sitio de origen: ${this.getDomain(item.link)}`;
    modalLanguage.classList.toggle('d-none', item.idioma.toLowerCase() !== "ingles");

    // Show modal
    this.modal.show();
  }

  // Show next article in modal
  showNextArticle(): void {
    if (this.results.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.results.length;
    this.openModal(this.currentIndex);
  }

  // Get domain from URL
  getDomain(url: string): string {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'URL inválida';
    }
  }

  // Show search message
  showSearchMessage(): void {
    const randomMessage = this.customMessages[Math.floor(Math.random() * this.customMessages.length)];
    this.searchMessage = randomMessage;
  }

  // Hide search message
  hideSearchMessage(): void {
    this.searchMessage = '';
  }

  // Add suggested term to search input
  addSuggestedTerm(term: string): void {
    const currentValue = this.searchInput.trim();
    const separator = currentValue.length > 0 ? ' ' : '';
    this.searchInput = `${currentValue}${separator}${term}`;
    this.onSearchInputChange();
  }

  // Clear search input and results
  clearSearch(): void {
    this.searchInput = '';
    this.results = [];
    this.resultCount = '';
    this.hideSearchMessage();
    this.searchTip = '';
    clearTimeout(this.typingTimeout);
    this.typeTip();
  }

  // Toggle visibility of clear button
  toggleClearButton(): void {
    // Esta función se puede manejar en la plantilla con *ngIf basado en searchInput
  }

  // Handle keyboard accessibility for suggested terms
  handleKeyPress(event: KeyboardEvent, term: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.addSuggestedTerm(term);
    }
  }

  // Sanitize resumen
  sanitizedResumen(resumen: string): string {
    return DOMPurify.sanitize(resumen);
  }

  // Get publication year
  getPublicationYear(fecha_publicacion: string): number {
    return this.convertToDate(fecha_publicacion).getFullYear();
  }
}
