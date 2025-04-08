import { Component, OnInit, inject, signal } from '@angular/core';
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

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(limit: number = 32): void {
    this.loading.set(true);
    this.error.set(null);
    const { pathMatch, searchKey } = {
      pathMatch: 'articles', // Endpoint path for articles
      searchKey: 'articulo',   // Search term for articles
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

  // Placeholder for filter logic
  applyFilters(filters: any): void {
    console.log('Applying filters:', filters);
    // Implement filter logic here and call fetchArticles with updated params
    // For now, just refetch with default limit
    // this.fetchArticles(); // Example: Refetch or apply client-side filtering
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