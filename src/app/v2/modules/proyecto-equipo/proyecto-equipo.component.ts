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
      cargo: 'Ingeniero de Proyectos',
      imagen: 'assets/team/pablo.webp',
    },
    {
      nombre: 'Alexis Pizarro',
      cargo: 'Ingeniero Backend & Database',
      imagen: 'assets/team/alexis.webp',
    },
    {
      nombre: 'Carlos Arias',
      cargo: 'Ingeniero Frontend',
      imagen: 'assets/team/carlos.webp',
    }
  ];

  constructor() {
    this.breadcrumbs = PROYECTO_EQUIPO;
  }
}
