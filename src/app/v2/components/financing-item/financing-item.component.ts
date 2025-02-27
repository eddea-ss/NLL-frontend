import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-financing-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './financing-item.component.html',
  styleUrl: './financing-item.component.scss',
})
export class FinancingItemComponent implements OnInit {
  resourcesService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  ngOnInit() {
    const userSector = localStorage.getItem('sector');
    if (userSector && this.data) {
      const sectorLower = userSector.toLowerCase();
      const titleHasSector = this.data.titulo?.toLowerCase().includes(sectorLower);
      const descriptionHasSector = this.data.descripcion?.toLowerCase().includes(sectorLower);
      const beneficiariesHasSector = this.data.beneficiarios?.toLowerCase().includes(sectorLower);
      const sectorHasSector = this.data.sector?.toLowerCase().includes(sectorLower);
      
      this.data.recomendado = titleHasSector || descriptionHasSector || beneficiariesHasSector || sectorHasSector;
    }
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
