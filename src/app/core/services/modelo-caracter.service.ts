import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from '@core/services/login.service';
import { Role } from '@shared/enums';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable({
  providedIn: 'root',
})
export class ModeloCaracterService {
  private saltHash = 'xdxd';
  private readonly apiUrl = 'https://proveedores.nuevoloslagos.org/user/rut/';

  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  private google = inject(GoogleAnalyticsService);
  currentUser = this.loginService.currentUser;
  //para caracter
  private _modeloCaracter: WritableSignal<boolean | null> = signal(null);
  public modeloCaracter = this._modeloCaracter.asReadonly();

  getSurveyByRut(rutToUse: string) {
    throw new Error('Method not implemented.');
  }

  constructor() {
    this.initializeModeloCaracter();
  }

  private initializeModeloCaracter(): void {
    // Verificar si el usuario está autenticado y es de rol "proveedor"
    if (this.loginService.isAuthenticated()) {
      const currentUser = this.loginService.getCurrentUser();
      if (currentUser && currentUser.rol.nombreRol === Role.Proveedor) {
        // Intentar obtener los datos del localStorage
        const storedData = localStorage.getItem('modelo-caracter');
        if (storedData) {
          try {
            const parsedData: boolean = JSON.parse(storedData);
            this._modeloCaracter.set(parsedData);
          } catch (e) {
            console.error(
              'Error al parsear modelo-caracter desde localStorage:',
              e
            );
            // Si hay error al parsear, eliminar del localStorage
            localStorage.removeItem('modelo-caracter');
          }
        }

        // Realizar la petición
        this.fetchSurveyData();
      }
    }
  }

  private fetchSurveyData(): void {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser && currentUser.rut) {
      const rutOriginal = currentUser.rut;
      const rutMd5 = this.stringToHash(rutOriginal);
      const url = `${this.apiUrl}${rutMd5}`;

      this.http
        .get<any>(url)
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          if (response.success) {
            try {
              this._modeloCaracter.set(true);
              localStorage.setItem('modelo-caracter', String(true));
            } catch (err) {
              console.warn(
                'No se encontraron resultados para el RUT especificado.'
              );
              // Opcional: Puedes limpiar el modelo si no hay datos
              this._modeloCaracter.set(null);
              localStorage.removeItem('modelo-caracter');
            }
          }
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

  public openLink(): void {
    try {
      const currentUser = this.currentUser();
      if (!currentUser || !currentUser.rut) {
        throw new Error('RUT no disponible');
      }

      const rutMd5 = this.stringToHash(currentUser.rut);
      const url = `https://proveedores.nuevoloslagos.org/?rut=${rutMd5}`;
      //google
      this.google.eventEmitter('click-modelo-caracterizacion-emprendedores', {
        label: 'Click Modelo Caracterizacion para Emprendedores',
      });
      window.open(url, '_self');
    } catch (error) {
      console.error('Error al obtener RUT de localStorage:', error);
    }
  }

  private stringToHash(string: string): string {
    const rutConSalt = `${string}-${this.saltHash}`;
    return CryptoJS.SHA256(rutConSalt).toString();
  }
}
