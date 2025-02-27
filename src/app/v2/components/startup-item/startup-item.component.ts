import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-startup-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './startup-item.component.html',
  styleUrl: './startup-item.component.scss',
})
export class StartupItemComponent implements OnInit {
  resourcesService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  ngOnInit() {
    const userSector = localStorage.getItem('sector');
    if (userSector && this.data) {
      const sectorLower = userSector.toLowerCase();
      const startupNameHasSector = this.data.nombreStartup?.toLowerCase().includes(sectorLower);
      const descriptionHasSector = this.data.descripcionStartup?.toLowerCase().includes(sectorLower);
      const uniquenessHasSector = this.data.unicidadStartup?.toLowerCase().includes(sectorLower);
      const sectorsServedMatch = this.data.sectores?.toLowerCase().includes(sectorLower);
      const technologiesMatch = this.data.tecnologias?.toLowerCase().includes(sectorLower);
      
      this.data.recomendado = startupNameHasSector || descriptionHasSector || uniquenessHasSector || sectorsServedMatch || technologiesMatch;
    }
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
