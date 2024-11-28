import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RecursosService } from '@core/services';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss',
})
export class CourseItemComponent {
  recursosService = inject(RecursosService);

  @Input() course: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  onOpenModal() {
    this.openModal.emit();
  }
}
