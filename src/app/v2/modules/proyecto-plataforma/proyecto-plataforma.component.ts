import { Component } from '@angular/core';
import { BreadcrumbsComponent, SugeridosComponent } from '@v2/components';
import { PROYECTO_PLATAFORMA } from '@v2/constants';
import { CarouselBannerComponent } from '../carousel-banner/carousel-banner.component';

@Component({
  selector: 'app-proyecto-plataforma',
  standalone: true,
  imports: [SugeridosComponent, BreadcrumbsComponent, CarouselBannerComponent],
  templateUrl: './proyecto-plataforma.component.html',
  styleUrl: './proyecto-plataforma.component.scss',
})
export class ProyectoPlataformaComponent {
  breadcrumbs: any[] = PROYECTO_PLATAFORMA;
}
