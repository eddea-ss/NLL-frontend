import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from '@core/services/login.service';
import { Role } from '@shared/enums';

interface SuccessResponse {
  success: true;
  data: any;
}

interface FailureResponse {
  success: false;
  message: string;
}

type ApiResponse = SuccessResponse | FailureResponse;

@Injectable({
  providedIn: 'root',
})
export class StartupEmprendimientoService {
  private saltHash = 'xdxd';
  private readonly apiUrl =
    'https://apiemprendedores.nuevoloslagos.org/startup/';

  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  currentUser = this.loginService.currentUser;
  //para caracter
  private _startupEmprendedores: WritableSignal<boolean | null> = signal(null);
  public startupEmprendedores = this._startupEmprendedores.asReadonly();

  private nameKeyStorage = 'startup-emprendedor';

  getSurveyByRut(rutToUse: string) {
    throw new Error('Method not implemented.');
  }

  constructor() {
    this.initializeService();
  }

  private initializeService(): void {
    // Verificar si el usuario está autenticado y es de rol "usuario"
    if (this.loginService.isAuthenticated()) {
      const currentUser = this.loginService.getCurrentUser();
      if (currentUser && currentUser.rol.nombreRol === Role.Usuario) {
        // Intentar obtener los datos del localStorage
        const storedData = localStorage.getItem(this.nameKeyStorage);
        if (storedData) {
          try {
            const parsedData: boolean = JSON.parse(storedData);
            this._startupEmprendedores.set(parsedData);
          } catch (e) {
            console.error(
              'Error al parsear modelo-caracter desde localStorage:',
              e
            );
            // Si hay error al parsear, eliminar del localStorage
            localStorage.removeItem(this.nameKeyStorage);
          }
        }

        // Realizar la petición
        this.fetchSurveyData();
      }
    }
  }

  private fetchSurveyData(): void {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser && currentUser.rutRepresentante) {
      const rutOriginal = currentUser.rutRepresentante;
      const rutMd5 = this.stringToHash(rutOriginal);
      const url = `${this.apiUrl}${rutMd5}`;

      this.http
        .get<ApiResponse>(url)
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          if (response.success) {
            try {
              this._startupEmprendedores.set(true);
              localStorage.setItem(this.nameKeyStorage, String(true));
            } catch (err) {
              console.warn(
                'No se encontraron resultados para el RUT especificado.'
              );
              // Opcional: Puedes limpiar el modelo si no hay datos
              this._startupEmprendedores.set(null);
              localStorage.removeItem(this.nameKeyStorage);
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

  public openLink(type: string): void {
    try {
      const currentUser = this.currentUser();
      if (!currentUser || !currentUser.rutRepresentante) {
        throw new Error('RUT no disponible');
      }

      const rutMd5 = this.stringToHash(currentUser.rutRepresentante);
      let url = '';
      if (type === 'STARTUP') {
        url = `https://emprendedores.nuevoloslagos.org//startup.html?rut=${rutMd5}`;
      } else {
        url = `https://emprendedores.nuevoloslagos.org//emprendedor.html?rut=${rutMd5}`;
      }

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
