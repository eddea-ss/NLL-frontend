import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-projects-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './projects-item.component.html',
  styleUrl: './projects-item.component.scss',
})
export class ProjectsItemComponent implements OnInit {
  resourcesService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  ngOnInit() {
    const userSector = localStorage.getItem('sector');
    if (userSector && this.data) {
      const sectorLower = userSector.toLowerCase();
      const titleHasSector = this.data.titulo?.toLowerCase().includes(sectorLower);
      const descriptionHasSector = this.data.resumen_de_la_solucion_?.toLowerCase().includes(sectorLower);
      const resultHasSector = this.data.resultado_del_proyecto_?.toLowerCase().includes(sectorLower);
      
      this.data.recomendado = titleHasSector || descriptionHasSector || resultHasSector;
    }
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
