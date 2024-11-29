import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.scss',
})
export class ArticleItemComponent {
  resourceService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  onOpenModal() {
    this.openModal.emit();
  }
}
