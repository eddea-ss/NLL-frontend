import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';

@Component({
  selector: 'app-course-modal',
  standalone: true,
  imports: [],
  templateUrl: './course-modal.component.html',
  styleUrl: './course-modal.component.scss',
})
export class CourseModalComponent {
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
