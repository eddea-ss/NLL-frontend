import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Meta, Title } from '@angular/platform-browser';
import { BreadcrumbsComponent, SugeridosComponent } from '@v2/components';
import { INVESTIGACION_INFORME } from '@v2/constants';

@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [
    SugeridosComponent,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    BreadcrumbsComponent,
  ],
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.scss',
})
export class InformeComponent {
  breadcrumbs: any[] = INVESTIGACION_INFORME;
  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {
    this.title.setTitle('Diagnóstico Regional i4.0 | Nuevo Los Lagos');

    // Add meta tags
    this.meta.updateTag({
      name: 'description',
      content:
        'Análisis del ecosistema de manufactura avanzada y sus desafíos. Este informe analiza el ecosistema de manufactura avanzada e industria 4.0 en la Región de Los Lagos.',
    });
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }
}
