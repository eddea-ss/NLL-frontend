import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { LoginService } from '@v2/services';
import { catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Role, UserType } from '@v2/enums';

interface SupplierSurvey {
  part1: boolean | null;
  part2: boolean | null;
  part3: boolean | null;
  part4: boolean | null;
  part5: boolean | null;
}

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private http = inject(HttpClient);
  private baseUrl = 'https://proveedores.nuevoloslagos.org';
  private passKey = '@hwUaKlqqja65K5i';

  private loginService = inject(LoginService);
  currentUser = this.loginService.currentUser;

  private _supplierSurvey: WritableSignal<SupplierSurvey> = signal({
    part1: null,
    part2: null,
    part3: null,
    part4: null,
    part5: null,
  });

  public supplierSurvey =
    this._supplierSurvey.asReadonly() as WritableSignal<SupplierSurvey>;

  private getHeaders() {
    return new HttpHeaders({ pass: this.passKey });
  }

  createRecord(rut: string, part: number, jsonData: any) {
    return this.http.post(
      `${this.baseUrl}/records`,
      {
        rut,
        part,
        json: JSON.stringify(jsonData),
      },
      { headers: this.getHeaders() }
    );
  }

  readRecord(rut: string, part: number) {
    return this.http.get(`${this.baseUrl}/records/${rut}/${part}`, {
      headers: this.getHeaders(),
    });
  }

  readByRut(rut: string) {
    return this.http.get(`${this.baseUrl}/records/${rut}`, {
      headers: this.getHeaders(),
    });
  }

  readAll() {
    return this.http.get(`${this.baseUrl}/records/`, {
      headers: this.getHeaders(),
    });
  }

  updateRecord(rut: string, part: number, jsonData: any) {
    return this.http.put(
      `${this.baseUrl}/records/${rut}/${part}`,
      {
        json: JSON.stringify(jsonData),
      },
      { headers: this.getHeaders() }
    );
  }

  deleteRecord(rut: string, part: number) {
    return this.http.delete(`${this.baseUrl}/records/${rut}/${part}`, {
      headers: this.getHeaders(),
    });
  }

  constructor() {
    this.initializeModeloCaracter();
  }

  private initializeModeloCaracter(): void {
    if (this.loginService.isAuthenticated()) {
      const currentUser = this.loginService.getCurrentUser();
      if (currentUser && currentUser.type === UserType.SUPPLIER) {
        // Intentar obtener los datos del localStorage
        const storedData = localStorage.getItem('modelo-caracter');
        if (storedData) {
          try {
            const parsedData: SupplierSurvey = JSON.parse(storedData);
            this._supplierSurvey.set(parsedData);
          } catch (e) {
            console.error(
              'Error al parsear modelo-caracter desde localStorage:',
              e
            );
            // Si hay error al parsear, eliminar del localStorage
            localStorage.removeItem('modelo-caracter');
          }
        }

        // Realizar la petición para obtener datos del servidor
        this.fetchSurveyData();
      }
    }
  }

  private fetchSurveyData(): void {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser && currentUser.rut) {
      const rutOriginal = currentUser.rut;
      const rutMd5 = this.loginService.stringToHash(rutOriginal);

      this.http
        .get<any>(`${this.baseUrl}/records/${rutMd5}`, {
          headers: this.getHeaders(),
        })
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          console.log(response);
          const existingSurvey: SupplierSurvey = {
            part1: !!response?.part1,
            part2: !!response?.part2,
            part3: !!response?.part3,
            part4: !!response?.part4,
            part5: !!response?.part5,
          };
          this._supplierSurvey.set(existingSurvey);
          localStorage.setItem(
            'modelo-caracter',
            JSON.stringify(existingSurvey)
          );
        });
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición del modelo caracter:', error);
    return throwError(
      () => new Error('Error en la petición del modelo caracter.')
    );
  }

  public recheckData(): void {
    this.fetchSurveyData();
  }
}
