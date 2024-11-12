import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BuscadorService } from '@core/services/buscador.service'; // Asegúrate de que la ruta sea correcta
import { Articulo } from '@shared/models/articulo.model'; // Asegúrate de que la ruta sea correcta
import { BuscadorDetalleComponent } from '../buscador-detalle/buscador-detalle.component';
import { EMPTY, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
   
})
export class BuscadorComponent implements OnInit, OnDestroy {

  private cdRef = inject(ChangeDetectorRef);
  searchControl = new FormControl('');
  resultados: Articulo[] = [];
  isLoading = false;
  error: string | null = null;
  private unsubscribe$ = new Subject<void>();

  // Datos de la ruta
  entityType = '';
  displayName = '';

  constructor(
    private buscadorService: BuscadorService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener los datos de la ruta
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.entityType = data['entityType'];
        this.displayName = data['name'];
      });

    // Suscripción a cambios en el input de búsqueda
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$),
      switchMap(query => {
        if (query && query.trim().length >= 2) {
          this.isLoading = true;
          this.error = null;
          return this.buscadorService.buscarRecursos(this.entityType, query);
        } else {
          this.resultados = [];
          return EMPTY;
        }
      })
    ).subscribe({
      next: (data: Articulo[]) => {
        this.isLoading = false;
        this.resultados = data;
        this.ordenarResultados();
        this.cdRef.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.error = err.message;
        this.cdRef.detectChanges();
      }
    });
  }

  /**
   * Getter para determinar si el valor del campo de búsqueda tiene al menos 2 caracteres.
   */
  get hasMinLength(): boolean {
    return (this.searchControl.value?.trim()?.length ?? 0) >= 2;
  }

  /**
   * Ordena los resultados primero por fecha de publicación (más reciente primero)
   * y luego por nivel (Muy Alto a Muy Bajo).
   */
  ordenarResultados(): void {
    const nivelOrder: Record<string, number> = {
      'Muy alto': 1,
      'Alto': 2,
      'Medio': 3,
      'Bajo': 4,
      'Muy bajo': 5
    };

    this.resultados.sort((a, b) => {
      const fechaA = this.convertToDate(a.fecha_publicacion);
      const fechaB = this.convertToDate(b.fecha_publicacion);
      if (fechaB > fechaA) return 1;
      if (fechaB < fechaA) return -1;
      return nivelOrder[a.nivel] - nivelOrder[b.nivel];
    });
  }

  /**
   * Convierte una cadena de fecha en formato 'DD/MM/YYYY' a un objeto Date.
   * @param dateString - Cadena de fecha en formato 'DD/MM/YYYY'
   * @returns Objeto Date
   */
  convertToDate(dateString: string): Date {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; // Los meses en JavaScript van de 0 (Enero) a 11 (Diciembre)
    const day = parseInt(dateString.substring(6, 8), 10);
    return new Date(year, month, day);
  }

  /**
   * Mapea el nivel a un número de estrellas.
   * @param nivel - Nivel de evaluación
   * @returns Número de estrellas
   */
  mapNivelToStars(nivel: string): number {
    const mapping: Record<string, number> = {
      'Muy alto': 5,
      'Alto': 4,
      'Medio': 3,
      'Bajo': 2,
      'Muy bajo': 1
    };
    return mapping[nivel] || 0;
  }

  /**
   * Abre el diálogo con los detalles del artículo seleccionado.
   * @param index - Índice del artículo en la lista de resultados
   */
  abrirModal(index: number): void {
    const dialogRef = this.dialog.open(BuscadorDetalleComponent, {
      width: '800px',
      data: this.resultados[index]
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result === 'siguiente') {
        this.siguienteArticulo(index);
      }
    });
  }

  /**
   * Abre el diálogo con los detalles del artículo seleccionado desde la posición siguiente.
   * @param currentIndex - Índice actual del artículo
   */
  siguienteArticulo(currentIndex: number): void {
    const nextIndex = (currentIndex + 1) % this.resultados.length;
    this.abrirModal(nextIndex);
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
