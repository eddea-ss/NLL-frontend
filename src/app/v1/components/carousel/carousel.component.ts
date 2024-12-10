import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, HostListener, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Slide } from '@shared/models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('carouselAnimation', [
      transition('inactive => active', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition('active => inactive', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ],
   
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides: Slide[] = [];
  @Input() showIndicators = true;
  @Input() showArrows = true;
  @Input() defaultDuration = 5000; // 5000 ms por defecto
  
  currentIndex = 0;
  private timeoutId: any;

  constructor(private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.slides.length > 0) {
      this.startCarousel();
    }
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  @HostListener('document:keydown.arrowLeft', ['$event'])
  onArrowLeft(event: KeyboardEvent) {
    this.prevSlide();
  }

  @HostListener('document:keydown.arrowRight', ['$event'])
  onArrowRight(event: KeyboardEvent) {
    this.nextSlide();
  }

  startCarousel() {
    const currentSlide = this.slides[this.currentIndex];
    const duration = currentSlide?.duration ?? this.defaultDuration;

    this.timeoutId = setTimeout(() => {
      this.nextSlide();
    }, duration);
  }

  stopCarousel() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.resetCarouselTimer();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.resetCarouselTimer();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetCarouselTimer();
  }

  resetCarouselTimer() {
    this.stopCarousel();
    this.startCarousel();
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
