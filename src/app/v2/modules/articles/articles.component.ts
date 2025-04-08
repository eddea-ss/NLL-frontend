import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService } from '@v2/services';
import { BreadcrumbsComponent, ArticleItemComponent, ArticleModalComponent } from '@v2/components';
import { Breadcrumb } from '@v2/models';
import { ACTUALIDAD_ARTICULOS } from '@v2/constants';

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
  articles = signal<any[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  isModalOpen = signal<boolean>(false);
  selectedArticle = signal<any | null>(null);
  searchTerm = signal<string>('');

  filteredArticles = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.articles();
    }
    return this.articles().filter(article => 
      article.titulo?.toLowerCase().includes(term) || 
      article.resumen?.toLowerCase().includes(term) ||
      article.articulo_paper?.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(limit: number = 32): void {
    this.loading.set(true);
    this.error.set(null);
    const { pathMatch, searchKey } = {
      pathMatch: 'articles',
      searchKey: 'articulo',
    };

    this.resourceService.searchResources(searchKey, pathMatch, limit).subscribe({
      next: (data) => {
        this.articles.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.error.set('No se pudieron cargar los artículos. Intente nuevamente más tarde.');
        this.loading.set(false);
      },
    });
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  openArticleModal(article: any): void {
    this.selectedArticle.set(article);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedArticle.set(null);
  }
} 