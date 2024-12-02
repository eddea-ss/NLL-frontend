import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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

  openLink(link: string): void {
    window.open(link, '_blank');
  }
}
