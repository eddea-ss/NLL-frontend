import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss',
})
export class CourseItemComponent {
  recursosService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  onOpenModal() {
    this.openModal.emit();
  }
}
