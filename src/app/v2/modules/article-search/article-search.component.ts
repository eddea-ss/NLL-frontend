import { Component } from '@angular/core';
import { SugeridosComponent } from '@v2/components';

@Component({
  selector: 'app-article-search',
  standalone: true,
  imports: [SugeridosComponent],
  templateUrl: './article-search.component.html',
  styleUrl: './article-search.component.scss',
})
export class ArticleSearchComponent {}
