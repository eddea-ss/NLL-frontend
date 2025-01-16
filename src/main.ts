// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { routes } from './app/app.routes'; // Asegúrate de que esta ruta es correcta

AOS.init({
  duration: 800, // duración de la animación en ms
  easing: 'ease-in-out', // tipo de easing
  once: true, // si quieres que la animación se ejecute solo una vez
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Proveer HttpClient aquí
  ],
}).catch((err) => console.error(err));
