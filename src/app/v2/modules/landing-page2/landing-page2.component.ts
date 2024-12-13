import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleSectionComponent } from '@v2/components';

@Component({
  selector: 'app-landing-page2',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleSectionComponent],
  templateUrl: './landing-page2.component.html',
  styleUrl: './landing-page2.component.scss',
})
export class LandingPage2Component {
  searchQuery: string = '';
  results: string[] = [];

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Simulación de resultados:
      this.results = [
        'Proveedor A - Especializado en maquinaria',
        'Proveedor B - Materiales de alta calidad',
        'Proveedor C - Servicios de mantenimiento industrial',
      ];
    } else {
      this.results = [];
    }
  }
}
