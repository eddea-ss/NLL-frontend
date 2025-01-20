import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  image?: string; // URL o ruta local a la imagen
  title?: string; // Opcional: Título
  content?: string; // Opcional: Texto descriptivo
  buttonText?: string; // Opcional: Texto del botón (CTA)
  buttonLink?: string; // Opcional: Enlace del botón
  type?: string; // Opcional:
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnDestroy {
  /**
   * Array de slides. Cada uno puede tener:
   * - image      (string): URL de la imagen
   * - title      (string): título opcional
   * - content    (string): texto o descripción
   * - buttonText (string): texto del botón CTA
   * - buttonLink (string): link al hacer click en el botón CTA
   */
  @Input() slides: Slide[] = [];

  @Input() showArrows: boolean = false;

  /**
   * Determina si el carrusel se reproduce automáticamente.
   */
  @Input() autoPlay: boolean = true;

  /**
   * Tiempo de exposición (intervalo) de cada slide en milisegundos.
   * Ejemplo: 3000 = 3s.
   */
  @Input() intervalTime: number = 3000;

  /**
   * Ancho del contenedor del carrusel (ej. '800px', '100%', '100vw').
   */
  @Input() width: string = '800px';

  /**
   * Alto del contenedor del carrusel (ej. '400px', '100vh').
   */
  @Input() height: string = '400px';

  /**
   * Tiempo de transición entre las diapositivas en milisegundos.
   */
  @Input() transitionTime: number = 500;

  currentIndex: number = 0;
  private intervalId?: number;

  ngOnInit() {
    if (this.autoPlay && this.slides.length > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  /**
   * Inicia la reproducción automática.
   */
  startAutoPlay(): void {
    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, this.intervalTime);
  }

  /**
   * Detiene la reproducción automática.
   */
  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  /**
   * Avanza a la siguiente diapositiva.
   */
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  /**
   * Retrocede a la diapositiva anterior.
   */
  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  openLink(url: string) {
    try {
      console.log(this.slides);
      window.open(url, '_self');
    } catch (error) {
      console.error('Error a redireccionar al modelo:', error);
    }
  }
}
