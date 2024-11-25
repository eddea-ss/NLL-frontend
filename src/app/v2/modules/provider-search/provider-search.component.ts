import { Component, OnInit, ElementRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import DOMPurify from 'dompurify';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SugeridosComponent } from '@v2/components';

@Component({
  selector: 'app-provider-search',
  standalone: true,
  imports: [SugeridosComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './provider-search.component.html',
  styleUrl: './provider-search.component.scss',
})
export class ProviderSearchComponent implements OnInit {
  isModalOpen = false;
  dataModal: any | undefined;

  urlExcel = 'https://control.nuevoloslagos.org/suppliers/excel/';

  searchTip = '';
  searchMessage = '';
  searchInput = '';
  resultCount = '';
  isLoading = false;
  results: any[] = [];

  tips: string[] = [
    '¿Sabías que puedes buscar empresas por "Los Lagos" o "Tecnología"?',
    'Prueba buscar "Más de 3 años" para encontrar empresas consolidadas.',
    'Puedes combinar palabras clave para refinar tus resultados, por ejemplo, "Industrial".',
    'Agrega términos específicos como "Tecnología" para encontrar empresas en sectores particulares.',
  ];
  customMessages: string[] = [
    '¡Espero que encuentres la empresa que buscas!',
    '¡Buena suerte en tu búsqueda!',
    '¡Éxito encontrando empresas innovadoras!',
    '¡Que encuentres empresas interesantes!',
    '¡Que tu búsqueda sea exitosa!',
    '¡Que la innovación te acompañe!',
  ];

  tipIndex = 0;
  charIndex = 0;
  typingSpeed = 50; // ms
  tipDelay = 3000; // ms
  typingTimeout: any;
  isUserTyping = false;

  private searchSubject = new Subject<string>();
  currentData: any[] = [];
  currentIndex = 0;
  constructor(private http: HttpClient, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.typeTip();
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.handleSearch(query);
    });

    // Initialize Bootstrap modal
    // @ts-ignore
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
    this.http
      .get<any[]>(
        `https://control.nuevoloslagos.org/suppliers/search?search=${encodeURIComponent(
          query
        )}`
      )
      .subscribe({
        next: (data: any) => {
          this.results = this.sortResults(data);
          this.resultCount = `${this.results.length} resultado${
            this.results.length !== 1 ? 's' : ''
          } para "${query}"`;
          if (this.results.length === 0) {
            this.resultCount = 'No se encontraron resultados.';
          }
        },
        error: (error: any) => {
          console.error('Error al obtener los datos:', error);
          this.resultCount = 'Error al obtener los datos.';
          this.results = [];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  // Sort results by date and importance
  sortResults(data: any[]): any[] {
    return data;
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
    console.log('asdas', item);
    this.isModalOpen = true;
    this.dataModal = item;
  }

  closeModal() {
    this.isModalOpen = false;
    this.dataModal = undefined;
  }

  // Show next article in modal
  showNextItem(): void {
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
    const randomMessage =
      this.customMessages[
        Math.floor(Math.random() * this.customMessages.length)
      ];
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

  openLink(link: string): void {
    try {
      if (!link) {
        console.warn('No se proporcionó un link');
        return;
      }

      // Verifica si el enlace incluye 'http://' o 'https://'
      if (!/^https?:\/\//i.test(link)) {
        link = 'https://' + link; // Puedes usar 'http://' si lo prefieres
      }

      console.log(link);
      window.open(link, '_blank');
    } catch (error) {
      console.error('Error al abrir el link:', error);
    }
  }

  downloadInfo(link: string): void {
    try {
      if (!link) {
        console.warn('No se proporcionó un link');
        return;
      }

      window.open(this.urlExcel + link, '_blank');
    } catch (error) {
      console.error('Error al abrir el link:', error);
    }
  }
}
