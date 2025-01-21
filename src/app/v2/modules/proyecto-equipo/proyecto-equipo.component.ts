import { Component } from '@angular/core';
import { BreadcrumbsComponent, SugeridosComponent } from '@v2/components';
import { PROYECTO_EQUIPO } from '@v2/constants';
import { CarouselBannerComponent } from '../carousel-banner/carousel-banner.component';

@Component({
  selector: 'app-proyecto-equipo',
  standalone: true,
  imports: [SugeridosComponent, BreadcrumbsComponent, CarouselBannerComponent],
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
      nombre: 'Marcelo Soto',
      cargo: 'Consultor Expero Industria 4.0 y Manufactura Avanzada',
      imagen: 'assets/team/marcelo.webp',
    },
    {
      nombre: 'Carlos Arias',
      cargo: 'Ingeniero de Software - Angular & Node',
      imagen: 'assets/team/carlos.webp',
    },
    {
      nombre: 'Alexis Pizarro',
      cargo: 'Ingeniero Backend & Database',
      imagen: 'assets/team/alexis.webp',
    },
  ];

  constructor() {
    this.breadcrumbs = PROYECTO_EQUIPO;
  }
}
