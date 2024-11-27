// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecursosService {
  private readonly API_BASE_URL = 'https://control.nuevoloslagos.org';

  constructor(private http: HttpClient) {}

  /**
   * Busca cursos según una consulta dada.
   * @param query La cadena de búsqueda.
   * @returns Un Observable que emite un arreglo de cursos.
   */
  searchResources(query: string, path: string): Observable<any[]> {
    const params = new HttpParams().set('search', query).set('limit', 5);

    return this.http
      .get<any[]>(`${this.API_BASE_URL}/${path}/search`, { params })
      .pipe(
        map((data: any) => {
          // Aquí puedes transformar los datos si es necesario
          return data as any[];
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Maneja errores de la petición HTTP.
   * @param error El error de la respuesta HTTP.
   * @returns Un Observable que emite un mensaje de error.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Aquí podrías agregar lógica para mostrar notificaciones al usuario
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
