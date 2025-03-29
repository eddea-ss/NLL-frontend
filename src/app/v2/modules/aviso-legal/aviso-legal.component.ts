import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BreadcrumbsComponent, SugeridosComponent } from '@v2/components';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    SugeridosComponent
  ],
  templateUrl: './aviso-legal.component.html'
})
export class AvisoLegalComponent {
  breadcrumbs = [
    { label: 'Inicio', url: '/' },
    { label: 'Aviso Legal', url: '/aviso-legal' }
  ];

  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {
    this.title.setTitle('Aviso Legal | Nuevo Los Lagos');
    
    this.meta.updateTag({
      name: 'description',
      content: 'Aviso legal y términos de uso del sitio web Nuevo Los Lagos. Información sobre propiedad intelectual, protección de datos y legislación aplicable.'
    });
  }
}