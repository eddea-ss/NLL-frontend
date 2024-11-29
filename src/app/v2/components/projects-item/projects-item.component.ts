import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-projects-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './projects-item.component.html',
  styleUrl: './projects-item.component.scss',
})
export class ProjectsItemComponent {
  resourcesService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  onOpenModal() {
    this.openModal.emit();
  }
}
