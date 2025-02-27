import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.scss',
})
export class ArticleItemComponent implements OnInit {
  resourceService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  ngOnInit() {
    const userSector = localStorage.getItem('sector');
    if (userSector && this.data) {
      // Split the sector string into an array of keywords
      const sectorKeywords = userSector.toLowerCase().split(',');
      
      // Check each keyword against article content
      this.data.recomendado = sectorKeywords.some(keyword => {
        const cleanKeyword = keyword.trim();
        
        // Check various article fields for keyword matches
        const titleHasKeyword = this.data.titulo?.toLowerCase().includes(cleanKeyword);
        const summaryHasKeyword = this.data.resumen?.toLowerCase().includes(cleanKeyword);
        const contentHasKeyword = this.data.contenido?.toLowerCase().includes(cleanKeyword);
        const keywordsHasKeyword = this.data.palabras_clave?.toLowerCase().includes(cleanKeyword);
        const typeHasKeyword = this.data.articulo_paper?.toLowerCase().includes(cleanKeyword);
        
        return titleHasKeyword || summaryHasKeyword || contentHasKeyword || keywordsHasKeyword || typeHasKeyword;
      });
    }
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
