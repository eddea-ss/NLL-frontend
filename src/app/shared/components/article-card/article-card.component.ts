import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
   
})
export class ArticleCardComponent {
  @Input() title = 'Título del Artículo';
  @Input() description = 'Descripción del artículo...';
}