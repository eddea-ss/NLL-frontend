import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService } from '@v2/services';
import { BreadcrumbsComponent, ArticleItemComponent, ArticleModalComponent } from '@v2/components';
import { Breadcrumb } from '@v2/models';
import { ACTUALIDAD_ARTICULOS } from '@v2/constants';

// Interface to define the structure for each article section
interface ArticleSection {
  key: string; 
  label: string; 
  searchKey: string; 
  articles: WritableSignal<any[]>;
  loading: WritableSignal<boolean>;
  error: WritableSignal<string | null>;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule, 
    BreadcrumbsComponent, 
    ArticleItemComponent, 
    ArticleModalComponent
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  private resourceService = inject(ResourceService);

  breadcrumbs: Breadcrumb[] = ACTUALIDAD_ARTICULOS;

  // Define the sections with their keywords and signals
  sections: ArticleSection[] = [
    { key: 'iot', label: 'Internet de las Cosas (IoT)', searchKey: 'iot', articles: signal([]), loading: signal(true), error: signal(null) },
    { key: 'lagos', label: 'Industria en Los Lagos', searchKey: 'los lagos', articles: signal([]), loading: signal(true), error: signal(null) },
    { key: 'ia', label: 'Inteligencia Artificial (IA)', searchKey: 'ia', articles: signal([]), loading: signal(true), error: signal(null) },
    { key: 'gemelos', label: 'Gemelos Digitales', searchKey: 'gemelos digitales', articles: signal([]), loading: signal(true), error: signal(null) },
    { key: 'ingles', label: 'Artículos en Inglés', searchKey: 'ingles', articles: signal([]), loading: signal(true), error: signal(null) }, 
    { key: 'paper', label: 'Papers Científicos', searchKey: 'paper', articles: signal([]), loading: signal(true), error: signal(null) },
  ];
  
  // Modal Signals (remain the same)
  isModalOpen = signal<boolean>(false);
  selectedArticle = signal<any | null>(null);

  ngOnInit(): void {
    // Fetch articles for each section when the component initializes
    this.sections.forEach(section => this.fetchArticlesForSection(section));
  }

  fetchArticlesForSection(section: ArticleSection, limit: number = 6): void {
    section.loading.set(true);
    section.error.set(null);
    const pathMatch = 'articles'; // Use the common articles endpoint path

    this.resourceService.searchResources(section.searchKey, pathMatch, limit).subscribe({
      next: (data) => {
        section.articles.set(data);
        section.loading.set(false);
      },
      error: (err) => {
        console.error(`Error fetching articles for section ${section.label}:`, err);
        section.error.set(`No se pudieron cargar los artículos para "${section.label}".`);
        section.loading.set(false);
      },
    });
  }

  // Modal methods (remain the same)
  openArticleModal(article: any): void {
    this.selectedArticle.set(article);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedArticle.set(null);
  }

  // --- New Method for Scrolling ---
  scrollToSection(sectionKey: string): void {
    const element = document.getElementById(sectionKey);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  // --- End New Method ---
} 