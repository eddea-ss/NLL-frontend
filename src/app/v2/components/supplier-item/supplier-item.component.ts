import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';

@Component({
  selector: 'app-supplier-item',
  standalone: true,
  imports: [],
  templateUrl: './supplier-item.component.html',
  styleUrl: './supplier-item.component.scss',
})
export class SupplierItemComponent {
  resourcesService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  onOpenModal() {
    this.openModal.emit();
  }
}
