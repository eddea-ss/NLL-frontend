import { Routes } from '@angular/router';
import {
  EvaluacionesMadurezComponent,
  EvaluacionesProveedorComponent,
  EvaluacionesStartupComponent,
  HomeComponent,
  InformeComponent,
  LandingPageComponent,
  PodcastsComponent,
  ProyectoEquipoComponent,
  ProyectoPlataformaComponent,
} from '@v2/v2.module';

export const routes: Routes = [
  //v2
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'proyecto-equipo', component: ProyectoEquipoComponent },
      { path: 'proyecto-plataforma', component: ProyectoPlataformaComponent },
      {
        path: 'evaluaciones-madurez',
        component: EvaluacionesMadurezComponent,
      },
      {
        path: 'evaluaciones-proveedor',
        component: EvaluacionesProveedorComponent,
      },
      {
        path: 'evaluaciones-startup',
        component: EvaluacionesStartupComponent,
      },
      { path: 'investigacion-podcasts', component: PodcastsComponent },
      { path: 'investigacion-diagnostico', component: InformeComponent },
    ],
  },
];
