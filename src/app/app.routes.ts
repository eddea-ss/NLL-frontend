import { Routes } from '@angular/router';
import {
  EvaluacionesMadurezComponent,
  EvaluacionesProveedorComponent,
  EvaluacionesStartupComponent,
  FormRegisterComponent,
  HomeComponent,
  InformeComponent,
  LandingPageComponent,
  LoginComponent,
  PodcastsComponent,
  ProyectoEquipoComponent,
  ProyectoPlataformaComponent,
  ResourceSearchComponent,
  SelectionRegisterComponent,
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
      {
        path: 'buscador-cursos',
        component: ResourceSearchComponent,
        data: { resourceType: 'curses' },
      },
      {
        path: 'buscador-articulos',
        component: ResourceSearchComponent,
        data: { resourceType: 'articles' },
      },
      {
        path: 'buscador-proyectos',
        component: ResourceSearchComponent,
        data: { resourceType: 'projects' },
      },
      {
        path: 'buscador-financiamiento',
        component: ResourceSearchComponent,
        data: { resourceType: 'financing' },
      },
      {
        path: 'buscador-proveedores',
        component: ResourceSearchComponent,
        data: { resourceType: 'suppliers' },
      },
      {
        path: 'buscador-startup',
        component: ResourceSearchComponent,
        data: { resourceType: 'startups' },
      },

      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: SelectionRegisterComponent,
      },
      {
        path: 'registro-persona',
        component: FormRegisterComponent,
      },
      {
        path: 'registro-industria',
        component: FormRegisterComponent,
      },
      {
        path: 'registro-proveedor',
        component: FormRegisterComponent,
      },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
