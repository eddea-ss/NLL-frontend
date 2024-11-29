// src/app/services/course.service.ts
import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleAnalyticsService } from './google-analytics.service';
import DOMPurify from 'dompurify';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly API_BASE_URL = 'https://control.nuevoloslagos.org';

  private readonly EXCEL_URL =
    'https://control.nuevoloslagos.org/suppliers/excel/';
  google = inject(GoogleAnalyticsService);
  http = inject(HttpClient);

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

  // Realizar la búsqueda de cursos según la consulta
  async fetchResults(query: string, resourceType: string): Promise<any> {
    try {
      const response = await fetch(
        `${
          this.API_BASE_URL
        }/${resourceType}/search?search=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Error en la solicitud');
      this.google.eventEmitter('search-' + resourceType, {
        search: encodeURIComponent(query),
      });
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
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

  // Sanitizar textos
  sanitizedString(text: string, jumpDot = false): string {
    if (!text) return '';
    let parrafos = text;
    if (jumpDot) {
      const oraciones = text
        .split('.')
        .map((oracion) => oracion.trim())
        .filter((oracion) => oracion.length > 0);
      parrafos = oraciones.map((oracion) => `<p>${oracion}.</p>`).join('');
    }
    return DOMPurify.sanitize(parrafos);
  }

  openLink(link: string): void {
    try {
      if (!link) {
        console.warn('No se proporcionó un link');
        return;
      }

      window.open(link, '_blank');
    } catch (error) {
      console.error('Error al abrir el link:', error);
    }
  }

  getDomain(url: string): string {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'URL inválida';
    }
  }

  getPublicationYear(fecha_publicacion: string): number {
    return this.convertToDate(fecha_publicacion).getFullYear();
  }

  // Convert date string to Date object
  convertToDate(dateString: string): Date {
    if (dateString.length !== 8) {
      console.warn(`Formato de fecha inesperado: ${dateString}`);
      return new Date(0); // Fecha por defecto
    }
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return new Date(`${year}-${month}-${day}`);
  }

  downloadExcelInfo(link: string): void {
    try {
      if (!link) {
        console.warn('No se proporcionó un link');
        return;
      }

      window.open(this.EXCEL_URL + link, '_blank');
    } catch (error) {
      console.error('Error al abrir el link:', error);
    }
  }
}
