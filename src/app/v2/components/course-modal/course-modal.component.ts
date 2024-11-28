import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RecursosService } from '@core/services';

@Component({
  selector: 'app-course-modal',
  standalone: true,
  imports: [],
  templateUrl: './course-modal.component.html',
  styleUrl: './course-modal.component.scss',
})
export class CourseModalComponent {
  @Input() course: any;
  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  recursosService = inject(RecursosService);

  onClose() {
    this.close.emit();
  }

  onShowNext() {
    this.next.emit();
  }
}
