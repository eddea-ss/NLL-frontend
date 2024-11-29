import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';

@Component({
  selector: 'app-projects-modal',
  standalone: true,
  imports: [],
  templateUrl: './projects-modal.component.html',
  styleUrl: './projects-modal.component.scss',
})
export class ProjectsModalComponent {
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
