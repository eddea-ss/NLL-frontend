import { Routes } from '@angular/router';
import { ProviderSearchComponent } from '@v2/modules/provider-search/provider-search.component';
import {
  ArticleSearchComponent,
  CourseSearchComponent,
  EvaluacionesMadurezComponent,
  EvaluacionesProveedorComponent,
  EvaluacionesStartupComponent,
  FinancingSearchComponent,
  HomeComponent,
  InformeComponent,
  LandingPageComponent,
  PodcastsComponent,
  ProjectSearchComponent,
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
      { path: 'buscador-cursos', component: CourseSearchComponent },
      { path: 'buscador-articulos', component: ArticleSearchComponent },
      { path: 'buscador-proyectos', component: ProjectSearchComponent },
      { path: 'buscador-financiamiento', component: FinancingSearchComponent },
      { path: 'buscador-proveedores', component: ProviderSearchComponent },
    ],
  },
];
