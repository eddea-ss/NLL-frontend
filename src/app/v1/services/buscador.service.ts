// src/app/services/buscador.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Articulo } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  private baseApiUrl = 'https://control.nuevoloslagos.org'; // Base de la API

  constructor(private http: HttpClient) { }

  /**
   * Realiza una búsqueda de artículos basada en el tipo de entidad y la consulta.
   * @param entityType - Tipo de entidad (e.g., 'articulos', 'cursos', etc.)
   * @param query - Consulta de búsqueda
   * @returns Observable con los resultados de la búsqueda
   */
  buscarRecursos(entityType: string, query: string): Observable<Articulo[]> {
    let type = entityType;
    if (type === 'articulos') {
      type = 'articles';
    } else if (type === 'proyectos') {
      type = 'projects';
    } else if (type === 'cursos') {
      type = 'curses';
    } else if (type === 'financiamiento') {
      type = 'financing';
    }
    const apiUrl = `${this.baseApiUrl}/${type}/search`;
    const params = new HttpParams().set('search', query);

    return this.http.get<Articulo[]>(apiUrl, { params })
      .pipe(
        catchError(this.manejarError)
      );
  }

  /**
   * Maneja los errores de las solicitudes HTTP.
   * @param error - Error de la solicitud HTTP
   * @returns Observable con el error
   */
  private manejarError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error('Error en la solicitud. Por favor, intenta nuevamente más tarde.'));
  }
}
