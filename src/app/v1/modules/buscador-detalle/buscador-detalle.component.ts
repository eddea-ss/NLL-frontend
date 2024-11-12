import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Articulo } from '@shared/models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-buscador-detalle',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './buscador-detalle.component.html',
  styleUrls: ['./buscador-detalle.component.scss'],
   
})
export class BuscadorDetalleComponent {
  resumenSanitizado: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<BuscadorDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Articulo,
    private sanitizer: DomSanitizer
  ) {
    // Sanitizar el resumen usando Angular's DomSanitizer
    this.resumenSanitizado = this.sanitizer.bypassSecurityTrustHtml(data.resumen);
  }

  /**
   * Cierra el diálogo.
   */
  cerrar(): void {
    this.dialogRef.close();
  }

  /**
   * Navega al siguiente artículo.
   */
  siguiente(): void {
    this.dialogRef.close('siguiente');
  }

  /**
   * Convierte una cadena de fecha en formato 'DD/MM/YYYY' a un objeto Date y devuelve el año.
   * @param dateString - Cadena de fecha en formato 'DD/MM/YYYY'
   * @returns Año de publicación
   */
  getPublicationYear(dateString: string): number {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`).getFullYear();
  }

  convertToDate(dateString: string): Date {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; // Los meses en JavaScript van de 0 (Enero) a 11 (Diciembre)
    const day = parseInt(dateString.substring(6, 8), 10);
    return new Date(year, month, day);
  }

  /**
   * Obtiene el dominio de una URL.
   * @param link - URL completa
   * @returns Dominio de la URL
   */
  obtenerDominio(link: string): string {
    try {
      const url = new URL(link);
      return url.hostname.replace('www.', '');
    } catch (e) {
      return '';
    }
  }
}