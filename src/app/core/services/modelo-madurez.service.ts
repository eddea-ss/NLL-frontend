import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from '@core/services/login.service';
import { Usuario } from '@shared/models';
import { Role } from '@shared/enums';

interface SurveyItem {
  SurveyID: number;
  Rut: string; // Este será el hash MD5
  DateTime: string;
  IndustryName: string;
  GradeCapitalHumano: string;
  GradeEstrategiaLiderazgo: string;
  GradeTecnologiaGestionDatos: string;
  GradeGestionInnovacionConocimiento: string;
  GradeProcesosAutomatizacion: string;
  TotalIndustryGrade: string;
  ResultGrade: string;
}

interface SuccessResponse {
  success: true;
  data: SurveyItem[];
}

interface FailureResponse {
  success: false;
  message: string;
}

type ApiResponse = SuccessResponse | FailureResponse;

export interface ProcessedSurveyItem {
  SurveyID: number;
  Rut: string; // RUT en formato original
  DateTime: string;
  IndustryName: string;
  GradeCapitalHumano: string;
  GradeEstrategiaLiderazgo: string;
  GradeTecnologiaGestionDatos: string;
  GradeGestionInnovacionConocimiento: string;
  GradeProcesosAutomatizacion: string;
  TotalIndustryGrade: string;
  ResultGrade: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModeloMadurezService {
  private saltHash = 'xdxd';

  private readonly apiUrl = 'https://apimadurez.nuevoloslagos.org/api/results/';
  private readonly apiUrlFormacion =
    'https://apiemprendedores.nuevoloslagos.org/madurez/';

  private http = inject(HttpClient);
  private loginService = inject(LoginService);

  currentUser = this.loginService.currentUser;

  // Signal para almacenar los datos del modelo de madurez
  private _modeloMadurez: WritableSignal<ProcessedSurveyItem[] | null> =
    signal(null);

  // Signal de solo lectura para exponer los datos
  public modeloMadurez = this._modeloMadurez.asReadonly();

  //para formacion
  private _modeloFormacion: WritableSignal<boolean | null> = signal(null);
  public modeloFormacion = this._modeloFormacion.asReadonly();

  constructor() {
    this.initializeModeloMadurez();
    this.initializeModeloFormacion();
  }

  /**
   * Inicializa el modelo de madurez verificando el localStorage
   * y realizando la petición si es necesario.
   */
  private initializeModeloMadurez(): void {
    // Verificar si el usuario está autenticado y es de rol "empresa"
    if (this.loginService.isAuthenticated()) {
      const currentUser = this.loginService.getCurrentUser();
      if (currentUser && currentUser.rol.nombreRol === Role.Empresa) {
        // Intentar obtener los datos del localStorage
        const storedData = localStorage.getItem('modelo-madurez');
        if (storedData) {
          try {
            const parsedData: ProcessedSurveyItem[] = JSON.parse(storedData);
            this._modeloMadurez.set(parsedData);
          } catch (e) {
            console.error(
              'Error al parsear modelo-madurez desde localStorage:',
              e
            );
            // Si hay error al parsear, eliminar del localStorage
            localStorage.removeItem('modelo-madurez');
          }
        }

        // Realizar la petición para obtener los datos actualizados
        this.fetchSurveyData();
      }
    }
  }

  private initializeModeloFormacion(): void {
    // Verificar si el usuario está autenticado y es de rol "empresa"
    if (this.loginService.isAuthenticated()) {
      const currentUser = this.loginService.getCurrentUser();
      if (currentUser && currentUser.rol.nombreRol === Role.Empresa) {
        // Intentar obtener los datos del localStorage
        const storedData = localStorage.getItem('modelo-formacion');
        if (storedData) {
          try {
            const parsedData: boolean = JSON.parse(storedData);
            this._modeloFormacion.set(parsedData);
          } catch (e) {
            console.error(
              'Error al parsear modelo-formacion desde localStorage:',
              e
            );
            // Si hay error al parsear, eliminar del localStorage
            localStorage.removeItem('modelo-formacion');
          }
        }

        // Realizar la petición para obtener los datos actualizados
        this.fetchSurveyData();
        this.fetchSurveyDataFormacion();
      }
    }
  }

  /**
   * Realiza la petición para obtener los datos del modelo de madurez.
   */
  private fetchSurveyData(): void {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser && currentUser.rut) {
      const rutOriginal = currentUser.rut;
      const rutMd5 = this.stringToHash(rutOriginal);
      const url = `${this.apiUrl}${rutMd5}`;

      this.http
        .get<ApiResponse>(url)
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          if (response.success) {
            console.log(response);
            const processedData = response.data.map((item) => ({
              SurveyID: item.SurveyID,
              Rut: rutOriginal, // Reemplazamos el hash por el RUT original
              DateTime: item.DateTime,
              IndustryName: item.IndustryName,
              GradeCapitalHumano: item.GradeCapitalHumano,
              GradeEstrategiaLiderazgo: item.GradeEstrategiaLiderazgo,
              GradeTecnologiaGestionDatos: item.GradeTecnologiaGestionDatos,
              GradeGestionInnovacionConocimiento:
                item.GradeGestionInnovacionConocimiento,
              GradeProcesosAutomatizacion: item.GradeProcesosAutomatizacion,
              TotalIndustryGrade: item.TotalIndustryGrade,
              ResultGrade: item.ResultGrade,
            }));

            // Obtener los datos almacenados en localStorage
            const storedData = this._modeloMadurez();

            // Comparar los datos
            if (JSON.stringify(storedData) !== JSON.stringify(processedData)) {
              // Si son diferentes, actualizar el Signal y el localStorage
              this._modeloMadurez.set(processedData);
              localStorage.setItem(
                'modelo-madurez',
                JSON.stringify(processedData)
              );
            }
          } else {
            console.warn(
              'No se encontraron resultados para el RUT especificado.'
            );
            // Opcional: Puedes limpiar el modelo si no hay datos
            this._modeloMadurez.set(null);
            localStorage.removeItem('modelo-madurez');
          }
        });
    }
  }

  private fetchSurveyDataFormacion(): void {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser && currentUser.rut) {
      const rutOriginal = currentUser.rut;
      const rutMd5 = this.stringToHash(rutOriginal);
      const url = `${this.apiUrlFormacion}${rutMd5}`;

      this.http
        .get<ApiResponse>(url)
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          if (response) {
            const storedData = this._modeloFormacion();

            try {
              this._modeloFormacion.set(response.success);
              localStorage.setItem(
                'modelo-formacion',
                String(response.success)
              );
            } catch (err) {
              console.warn(
                'No se encontraron resultados para el RUT especificado.'
              );
              // Opcional: Puedes limpiar el modelo si no hay datos
              this._modeloFormacion.set(null);
              localStorage.removeItem('modelo-formacion');
            }
          }
        });
    }
  }

  /**
   * Maneja los errores de la petición HTTP.
   * @param error Error de la petición
   * @returns Observable que lanza un error
   */
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición del modelo de madurez:', error);
    return throwError(
      () => new Error('Error en la petición del modelo de madurez.')
    );
  }

  /**
   * Función pública para forzar la verificación de los datos y actualizar si es necesario.
   */
  public recheckData(): void {
    this.fetchSurveyData();
    this.fetchSurveyDataFormacion();
  }

  public openLink(): void {
    try {
      const currentUser = this.currentUser();
      if (!currentUser || !currentUser.rut) {
        throw new Error('RUT no disponible');
      }

      const rutMd5 = this.stringToHash(currentUser.rut);

      const url = `https://modelomadurez.nuevoloslagos.org?rut=${rutMd5}`;
      window.open(url, '_self');
    } catch (error) {
      console.error('Error al obtener RUT de localStorage:', error);
    }
  }

  openLinkFormacion(): void {
    try {
      const currentUser = this.currentUser();
      if (!currentUser || !currentUser.rut) {
        throw new Error('RUT no disponible');
      }

      const rutMd5 = this.stringToHash(currentUser.rut);

      const url = `https://modelomadurez.nuevoloslagos.org/formacion.html?rut=${rutMd5}`;
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
