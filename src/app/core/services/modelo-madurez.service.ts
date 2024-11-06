import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloMadurezService {
  //private baseUrl: string = 'https://modelomadurez.nuevoloslagos.org/api/surveys';
  private baseUrl: string = 'http://64.176.10.243:3021/api/encuestas/test-modelo?rut=';

  // Clave de acceso proporcionada
  private passkey: string = '4ZZ2sffWWWR45xfwghfWERr45jiuy3cvZ445DFS';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los resultados de la encuesta para un RUT específico.
   * @param rut El RUT de la empresa (ejemplo: '1234-1')
   * @returns Observable con la respuesta de la API
   */
  getSurveyByRut(rut: string): Observable<any> {
    const url = `${this.baseUrl}${rut}`;
    const headers = new HttpHeaders({
      'x-passkey': this.passkey,
    });

    return this.http.get<any>(url, { headers });
  }
}
