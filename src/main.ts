// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes'; // Asegúrate de que esta ruta es correcta

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(), // Proveer HttpClient aquí
  ],
}).catch(err => console.error(err));
