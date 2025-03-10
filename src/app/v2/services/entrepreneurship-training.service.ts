import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from '@v2/services';
import { Role, UserType } from '@v2/enums';

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
export class EntrepreneurshipTrainingService {
  private saltHash = 'xdxd';
  private readonly apiUrl =
    'https://apiemprendedores.nuevoloslagos.org/madurez/';

  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  currentUser = this.loginService.currentUser;
  //para caracter
  private _formacionEmprendedores: WritableSignal<boolean | null> =
    signal(null);
  public formacionEmprendedores = this._formacionEmprendedores.asReadonly();

  private nameKeyStorage = 'formacion-emprendedor';

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
      if (currentUser && currentUser.type === UserType.STARTUP) {
        // Intentar obtener los datos del localStorage
        const storedData = localStorage.getItem(this.nameKeyStorage);
        if (storedData) {
          try {
            const parsedData: boolean = JSON.parse(storedData);
            this._formacionEmprendedores.set(parsedData);
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
    if (currentUser && currentUser.rut) {
      const rutMd5 = currentUser.rut;
      const url = `${this.apiUrl}${rutMd5}`;

      this.http
        .get<ApiResponse>(url)
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          if (response.success) {
            try {
              this._formacionEmprendedores.set(true);
              localStorage.setItem(this.nameKeyStorage, String(true));
            } catch (err) {
              console.warn(
                'No se encontraron resultados para el RUT especificado.'
              );
              // Opcional: Puedes limpiar el modelo si no hay datos
              this._formacionEmprendedores.set(null);
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

  public openLink(): void {
    try {
      const currentUser = this.currentUser();
      if (!currentUser || !currentUser.rut) {
        throw new Error('RUT no disponible');
      }

      const rutMd5 = currentUser.rut;

      const url = `https://emprendedores.nuevoloslagos.org/formacion-emprendedor.html?rut=${rutMd5}`;
      window.open(url, '_self');
    } catch (error) {
      console.error('Error al obtener RUT de localStorage:', error);
    }
  }
}
