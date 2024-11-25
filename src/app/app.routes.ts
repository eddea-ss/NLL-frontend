import { Routes } from '@angular/router';
import { ProviderSearchComponent } from '@v2/modules/provider-search/provider-search.component';
import { StartupSearchComponent } from '@v2/modules/startup-search/startup-search.component';
import {
  ArticleSearchComponent,
  CourseSearchComponent,
  EvaluacionesMadurezComponent,
  EvaluacionesProveedorComponent,
  EvaluacionesStartupComponent,
  FinancingSearchComponent,
  FormRegisterComponent,
  HomeComponent,
  InformeComponent,
  LandingPageComponent,
  LoginComponent,
  PodcastsComponent,
  ProjectSearchComponent,
  ProyectoEquipoComponent,
  ProyectoPlataformaComponent,
  SelectionRegisterComponent,
} from '@v2/v2.module';

export const routes: Routes = [
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
      { path: 'buscador-cursos', component: CourseSearchComponent },
      { path: 'buscador-articulos', component: ArticleSearchComponent },
      { path: 'buscador-proyectos', component: ProjectSearchComponent },
      { path: 'buscador-financiamiento', component: FinancingSearchComponent },
      { path: 'buscador-proveedores', component: ProviderSearchComponent },
      { path: 'buscador-startup', component: StartupSearchComponent },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
