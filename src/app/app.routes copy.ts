import { Routes } from '@angular/router';
import {
  BuscadorComponent,
  BuscadorDetalleComponent,
  HomeComponent,
  InformeComponent,
  LandingPageComponent,
  LoginComponent,
  ModeloComponent,
  PodcastsComponent,
  QuienesSomosComponent,
  RegistroComponent,
  RegistroFormularioComponent,
  ArticleSearchComponent,
  CourseSearchComponent,
  FinancingSearchComponent,
  ProjectSearchComponent,
} from '@v1/v1.module';

export const routes: Routes = [
  //rutas sin navbar & sidebar
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  //rutas con registro de entidad
  {
    path: 'registro-persona',
    component: RegistroFormularioComponent,
    data: { entityType: 'Persona' },
  },
  {
    path: 'registro-empresa',
    component: RegistroFormularioComponent,
    data: { entityType: 'Empresa' },
  },
  {
    path: 'registro-proveedor',
    component: RegistroFormularioComponent,
    data: { entityType: 'Proveedor' },
  },

  //rutas con navbar & sidebar
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingPageComponent }, // Página de inicio por defecto

      {
        path: 'quienes-somos',
        component: QuienesSomosComponent,
      },
      { path: 'modelo', component: ModeloComponent },
      { path: 'modelo/:rut', component: ModeloComponent },
      { path: 'informe', component: InformeComponent },
      { path: 'podcasts', component: PodcastsComponent },

      // Rutas para 'cursos'
      {
        path: 'cursos',
        component: CourseSearchComponent,
        data: { entityType: 'cursos', name: 'Cursos' },
      },

      // Rutas para 'articulos'
      {
        path: 'articulos',
        component: ArticleSearchComponent,
        data: { entityType: 'articulos', name: 'Artículos de interés' },
      },

      // Rutas para 'proveedores'
      {
        path: 'proveedores',
        component: BuscadorComponent,
        data: { entityType: 'proveedores', name: 'Proveedores' },
      },
      {
        path: 'proveedores/:id',
        component: BuscadorDetalleComponent,
        data: { entityType: 'proveedores', name: 'Proveedores' },
      },

      // Rutas para 'casos-exito'
      {
        path: 'proyectos',
        component: ProjectSearchComponent,
        data: { entityType: 'proyectos', name: 'Proyectos destacados' },
      },

      // Rutas para 'financiamiento-empleo'
      {
        path: 'financiamiento',
        component: FinancingSearchComponent,
        data: { entityType: 'financiamiento', name: 'Financiamiento' },
      },
    ],
  },
];
