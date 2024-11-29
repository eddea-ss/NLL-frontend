import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';

@Component({
  selector: 'app-startup-modal',
  standalone: true,
  imports: [],
  templateUrl: './startup-modal.component.html',
  styleUrl: './startup-modal.component.scss',
})
export class StartupModalComponent {
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
