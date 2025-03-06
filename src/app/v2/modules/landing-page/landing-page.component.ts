import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { BreadcrumbsComponent } from '@v2/components';
import { INICIO } from '@v2/constants';
import { SelectionRegisterComponent } from '@v2/modules';
import { TitleSectionComponent } from '@v2/components';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbsComponent,
    SelectionRegisterComponent,
    TitleSectionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  breadcrumbs: any[] = INICIO;

  cards = [
    {
      title: 'Proveedores',
      icon: 'dinero',
      link: '/registro-proveedor',
      buttonLabel: 'Registrarse',
      description: `¿Quieres unirte a nuestra plataforma como proveedor de productos o
          servicios para la Industria 4.0?`,
    },
    {
      title: 'Empresas de los lagos',
      icon: 'empresas',
      link: '/registro-industria',
      buttonLabel: 'Registrarse',
      description: `¿Formas parte de la Industria 4.0 y necesitas formación o proveedores
          para tu negocio?`,
    },
    {
      title: 'Startups y Emprendedores',
      icon: 'startups',
      link: '/registro-persona',
      buttonLabel: 'Registrarse',
      description: `Regístrate como Startup o Emprendedor, y explora oportunidades de
              desarrollo, empleo y formación.`,
    },
  ];

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Plataforma Nuevo Los Lagos | Impulso Industrial');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'La plataforma "Nuevo Los Lagos" es una iniciativa colaborativa para fortalecer la infraestructura industrial y profesional en la Región de Los Lagos, con apoyo de Corfo, Asimet y la Universidad Santo Tomás.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Región de Los Lagos, Industria 4.0, infraestructura industrial, desarrollo profesional',
    });
  }
}
