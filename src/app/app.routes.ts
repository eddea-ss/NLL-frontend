// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from '@v2/v2.module'; // Asegúrate de que HomeComponent sea standalone o mantenlo como está

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@v2/modules/landing-page/landing-page.component').then(
            (m) => m.LandingPageComponent
          ),
      },
      {
        path: 'landing',
        loadComponent: () =>
          import('@v2/modules/landing-page2/landing-page2.component').then(
            (m) => m.LandingPage2Component
          ),
      },
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
      },
      {
        path: 'evaluaciones-proveedor',
        loadComponent: () =>
          import(
            '@v2/modules/evaluaciones-proveedor/evaluaciones-proveedor.component'
          ).then((m) => m.EvaluacionesProveedorComponent),
      },
      {
        path: 'evaluaciones-startup',
        loadComponent: () =>
          import(
            '@v2/modules/evaluaciones-startup/evaluaciones-startup.component'
          ).then((m) => m.EvaluacionesStartupComponent),
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
        path: 'buscador-cursos',
        loadComponent: () =>
          import('@v2/modules/resource-search/resource-search.component').then(
            (m) => m.ResourceSearchComponent
          ),
        data: { resourceType: 'curses' },
      },
      {
        path: 'buscador-articulos',
        loadComponent: () =>
          import('@v2/modules/resource-search/resource-search.component').then(
            (m) => m.ResourceSearchComponent
          ),
        data: { resourceType: 'articles' },
      },
      {
        path: 'buscador-proyectos',
        loadComponent: () =>
          import('@v2/modules/resource-search/resource-search.component').then(
            (m) => m.ResourceSearchComponent
          ),
        data: { resourceType: 'projects' },
      },
      {
        path: 'buscador-financiamiento',
        loadComponent: () =>
          import('@v2/modules/resource-search/resource-search.component').then(
            (m) => m.ResourceSearchComponent
          ),
        data: { resourceType: 'financing' },
      },
      {
        path: 'buscador-proveedores',
        loadComponent: () =>
          import('@v2/modules/resource-search/resource-search.component').then(
            (m) => m.ResourceSearchComponent
          ),
        data: { resourceType: 'suppliers' },
      },
      {
        path: 'buscador-startup',
        loadComponent: () =>
          import('@v2/modules/resource-search/resource-search.component').then(
            (m) => m.ResourceSearchComponent
          ),
        data: { resourceType: 'startups' },
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
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
