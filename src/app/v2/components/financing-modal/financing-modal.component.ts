import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';

@Component({
  selector: 'app-financing-modal',
  standalone: true,
  imports: [],
  templateUrl: './financing-modal.component.html',
  styleUrl: './financing-modal.component.scss',
})
export class FinancingModalComponent {
  @Input() data: any;
  @Input() showNext: boolean = true;
  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  resourseService = inject(ResourceService);

  onClose() {
    this.close.emit();
  }

  onShowNext() {
    this.next.emit();
  }
}
