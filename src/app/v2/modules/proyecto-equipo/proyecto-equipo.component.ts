import { Component } from '@angular/core';
import { SugeridosComponent } from '@v2/components';

@Component({
  selector: 'app-proyecto-equipo',
  standalone: true,
  imports: [SugeridosComponent],
  templateUrl: './proyecto-equipo.component.html',
  styleUrl: './proyecto-equipo.component.scss',
})
export class ProyectoEquipoComponent {
  equipo = [
    {
      nombre: 'Jorge Muñoz',
      cargo: 'Director Proyecto',
      imagen: 'assets/team/jorge.jpg',
    },
    {
      nombre: 'Pablo Rogel',
      cargo: 'Ingeniero de proyectos',
      imagen: 'assets/team/pablo.jpg',
    },
  ];
}
