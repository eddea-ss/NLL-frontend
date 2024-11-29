import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';
@Component({
  selector: 'app-financing-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './financing-item.component.html',
  styleUrl: './financing-item.component.scss',
})
export class FinancingItemComponent {
  resourcesService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  onOpenModal() {
    this.openModal.emit();
  }
}
