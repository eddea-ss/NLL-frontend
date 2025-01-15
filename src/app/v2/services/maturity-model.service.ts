import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginService } from '@v2/services';
import { Role, Sector, UserType } from '@v2/enums';
import { GoogleAnalyticsService } from './google-analytics.service';

interface MaturityScore {
  puntaje_sector: null | number;
  puntaje_general: null | number;
  puntaje_por_categoria: null | Category;
  puntaje_total: null | number;
  respuestas_general: null | number;
  respuestas_sector: null | number;
  respuestas_formacion: null | number;
  respuestas_proveedor: null | number;
}

interface Category {
  estrategia_y_liderazgo: null | number;
  capital_humano_y_organizacion_digital: null | number;
  procesos_y_automatizacion: null | number;
  gestion_de_la_innovacion_y_conocimiento: null | number;
  tecnologia_y_gestion_de_datos: null | number;
}

interface Response {
  success: true;
  data: MaturityScore;
}

@Injectable({
  providedIn: 'root',
})
export class MaturityModelService {
  private saltHash = 'xdxd';

  private readonly apiUrl =
    'https://apimadurez.nuevoloslagos.org/resultados?rut=';

  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  private google = inject(GoogleAnalyticsService);

  currentUser = this.loginService.currentUser;

  // Signal para almacenar los datos del modelo de madurez
  private _modeloMadurez: WritableSignal<MaturityScore | null> = signal(null);

  // Signal de solo lectura para exponer los datos
  public modeloMadurez = this._modeloMadurez.asReadonly();

  constructor() {
    this.initializeModeloMadurez();
  }

  /**
   * Inicializa el modelo de madurez verificando el localStorage
   * y realizando la petición si es necesario.
   */
  private initializeModeloMadurez(): void {
    // Verificar si el usuario está autenticado y es de rol "empresa"
    if (this.loginService.isAuthenticated()) {
      const currentUser = this.loginService.getCurrentUser();
      if (currentUser && currentUser.type === UserType.COMPANY) {
        // Intentar obtener los datos del localStorage
        const storedData = localStorage.getItem('modelo-madurez');
        if (storedData) {
          try {
            const parsedData: MaturityScore = JSON.parse(storedData);
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

  /**
   * Realiza la petición para obtener los datos del modelo de madurez.
   */
  private fetchSurveyData(): void {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser && currentUser.rut) {
      const rutMd5 = currentUser.rut;
      const url = `${this.apiUrl}${rutMd5}`;

      this.http
        .get<MaturityScore>(url)
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          if (response) {
            const processedData = response;
            this._modeloMadurez.set(processedData);
            localStorage.setItem(
              'modelo-madurez',
              JSON.stringify(processedData)
            );
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
  }

  openLinkProveedores() {
    try {
      const rutMd5 = this.currentUser()!.rut;
      const sector = this.currentUser()!.sector?.toLocaleLowerCase();
      this.openLink(
        `https://modelomadurez.nuevoloslagos.org/modelos/proveedores/?rut=${rutMd5}&sector=${sector}`
      );
    } catch (error) {
      console.error('Error a redireccionar al modelo:', error);
    }
  }

  openLinkSectorial() {
    try {
      const rutMd5 = this.currentUser()!.rut;
      const sector = this.currentUser()!.sector?.toLocaleLowerCase();
      this.openLink(
        `https://modelomadurez.nuevoloslagos.org/modelos/sectores/?rut=${rutMd5}&sector=${sector}`
      );
    } catch (error) {
      console.error('Error a redireccionar al modelo:', error);
    }
  }

  openLinkFormacion() {
    try {
      const rutMd5 = this.currentUser()!.rut;
      const sector = this.currentUser()!.sector?.toLocaleLowerCase();
      this.openLink(
        `https://modelomadurez.nuevoloslagos.org/modelos/formacion/?rut=${rutMd5}&sector=${sector}`
      );
    } catch (error) {
      console.error('Error a redireccionar al modelo:', error);
    }
  }

  openLinkGeneral() {
    try {
      const rutMd5 = this.currentUser()!.rut;
      this.openLink(
        `https://modelomadurez.nuevoloslagos.org/modelos/general/?rut=${rutMd5}`
      );
    } catch (error) {
      console.error('Error a redireccionar al modelo:', error);
    }
  }

  openLink(url: string) {
    try {
      const currentUser = this.currentUser();
      if (!currentUser || !currentUser.rut || !currentUser.sector) {
        console.warn('RUT no disponible');
      }
      window.open(url, '_self');
    } catch (error) {
      console.error('Error a redireccionar al modelo:', error);
    }
  }
}
