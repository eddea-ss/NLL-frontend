import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { ResourceService } from '@v2/services';

@Component({
  selector: 'app-supplier-item',
  standalone: true,
  imports: [],
  templateUrl: './supplier-item.component.html',
  styleUrl: './supplier-item.component.scss',
})
export class SupplierItemComponent implements OnInit {
  resourcesService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  ngOnInit() {
    const userSector = localStorage.getItem('sector');
    if (userSector && this.data) {
      const sectorLower = userSector.toLowerCase();
      const companyNameHasSector = this.data.nombreEmpresa?.toLowerCase().includes(sectorLower);
      const descriptionHasSector = this.data.descripcionEmpresa?.toLowerCase().includes(sectorLower);
      const servicesHasSector = this.data.servicios?.toLowerCase().includes(sectorLower);
      const sectorMatchesUser = this.data.sector?.toLowerCase() === sectorLower;
      
      if (companyNameHasSector || descriptionHasSector || servicesHasSector || sectorMatchesUser) {
        this.data.recomendado = true;
      }
    }
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
