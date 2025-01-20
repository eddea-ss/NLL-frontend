import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BreadcrumbsComponent, SugeridosComponent } from '@v2/components';
import { INVESTIGACION_INFORME } from '@v2/constants';
import { CarouselBannerComponent } from '../carousel-banner/carousel-banner.component';

@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [
    SugeridosComponent,
    CommonModule,
    BreadcrumbsComponent,
    CarouselBannerComponent,
  ],
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.scss',
})
export class InformeComponent {
  breadcrumbs: any[] = INVESTIGACION_INFORME;
  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {
    this.title.setTitle('Diagnóstico de la Industria 4.0 | Nuevo Los Lagos');

    // Add meta tags
    this.meta.updateTag({
      name: 'description',
      content:
        'Explora el diagnóstico del ecosistema de manufactura avanzada en la Región de Los Lagos. Descubre los desafíos y oportunidades clave para la industria 4.0.',
    });
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }
}
