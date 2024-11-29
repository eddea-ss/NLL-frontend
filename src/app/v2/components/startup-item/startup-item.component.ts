import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-startup-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './startup-item.component.html',
  styleUrl: './startup-item.component.scss',
})
export class StartupItemComponent {
  resourcesService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  onOpenModal() {
    this.openModal.emit();
  }
}
