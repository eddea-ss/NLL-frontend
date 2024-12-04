import { Component } from '@angular/core';
import { BreadcrumbsComponent, SugeridosComponent } from '@v2/components';
import { PROYECTO_EQUIPO } from '@v2/constants';

@Component({
  selector: 'app-proyecto-equipo',
  standalone: true,
  imports: [SugeridosComponent, BreadcrumbsComponent],
  templateUrl: './proyecto-equipo.component.html',
  styleUrl: './proyecto-equipo.component.scss',
})
export class ProyectoEquipoComponent {
  breadcrumbs: any[] = [];
  equipo = [
    {
      nombre: 'Jorge Muñoz',
      cargo: 'Director Proyecto',
      imagen: 'assets/team/jorge.webp',
    },
    {
      nombre: 'Pablo Rogel',
      cargo: 'Ingeniero de proyectos',
      imagen: 'assets/team/pablo.webp',
    },
  ];

  constructor() {
    this.breadcrumbs = PROYECTO_EQUIPO;
  }
}
