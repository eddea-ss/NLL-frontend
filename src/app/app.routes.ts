// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from '@v2/v2.module';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@v2/modules/landing-page3/landing-page3.component').then(
        (m) => m.LandingPage3Component
      ),
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'buscador',
        loadComponent: () =>
          import('@v2/modules/general-search/general-search.component').then(
            (m) => m.GeneralSearchComponent
          ),
      },
      {
        path: 'proyecto-equipo',
        loadComponent: () =>
          import('@v2/modules/proyecto-equipo/proyecto-equipo.component').then(
            (m) => m.ProyectoEquipoComponent
          ),
      },
      {
        path: 'proyecto-plataforma',
        loadComponent: () =>
          import(
            '@v2/modules/proyecto-plataforma/proyecto-plataforma.component'
          ).then((m) => m.ProyectoPlataformaComponent),
      },
      {
        path: 'evaluaciones-madurez',
        loadComponent: () =>
          import(
            '@v2/modules/evaluaciones-madurez/evaluaciones-madurez.component'
          ).then((m) => m.EvaluacionesMadurezComponent),
        canActivate: [authGuard],
      },
      {
        path: 'evaluaciones-proveedor',
        loadComponent: () =>
          import(
            '@v2/modules/evaluaciones-proveedor/evaluaciones-proveedor.component'
          ).then((m) => m.EvaluacionesProveedorComponent),
        canActivate: [authGuard],
      },
      {
        path: 'evaluaciones-startup',
        loadComponent: () =>
          import(
            '@v2/modules/evaluaciones-startup/evaluaciones-startup.component'
          ).then((m) => m.EvaluacionesStartupComponent),
        canActivate: [authGuard],
      },
      {
        path: 'investigacion-podcasts',
        loadComponent: () =>
          import('@v2/modules/podcasts/podcasts.component').then(
            (m) => m.PodcastsComponent
          ),
      },
      {
        path: 'investigacion-diagnostico',
        loadComponent: () =>
          import('@v2/modules/informe/informe.component').then(
            (m) => m.InformeComponent
          ),
      },

      {
        path: 'login',
        loadComponent: () =>
          import('@v2/modules/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import(
            '@v2/modules/selection-register/selection-register.component'
          ).then((m) => m.SelectionRegisterComponent),
      },
      {
        path: 'registro-persona',
        loadComponent: () =>
          import('@v2/modules/form-register/form-register.component').then(
            (m) => m.FormRegisterComponent
          ),
      },
      {
        path: 'registro-industria',
        loadComponent: () =>
          import('@v2/modules/form-register/form-register.component').then(
            (m) => m.FormRegisterComponent
          ),
      },
      {
        path: 'registro-proveedor',
        loadComponent: () =>
          import('@v2/modules/form-register/form-register.component').then(
            (m) => m.FormRegisterComponent
          ),
      },
      {
        path: 'modelo-caracterizacion/:part',
        loadComponent: () =>
          import('@v2/modules/survey-form/survey-form.component').then(
            (m) => m.SurveyFormComponent
          ),
      },
      {
        path: 'aviso-legal',
        loadComponent: () =>
          import('@v2/modules/aviso-legal/aviso-legal.component').then(
            (m) => m.AvisoLegalComponent
          ),
      },
      {
        path: 'articulos',
        loadComponent: () =>
          import('@v2/modules/articles/articles.component').then(
            (m) => m.ArticlesComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
