// src/app/services/registro.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegistroCredentials, RegistroResponse } from '@shared/models';
import { Role } from '@shared/enums';
import { LoginService, SnackbarService } from '@v2/services';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private snackbar = inject(SnackbarService);
  private http = inject(HttpClient);
  private loginService = inject(LoginService);

  private google = inject(GoogleAnalyticsService);

  // Definir endpoints para cada tipo de usuario
  private apiEndpoints: Record<Role, string> = {
    [Role.Usuario]: 'https://accesos.nuevoloslagos.org/api/usuarios',
    [Role.Empresa]: 'https://accesos.nuevoloslagos.org/api/empresas',
    [Role.Proveedor]: 'https://accesos.nuevoloslagos.org/api/proveedores',
  };

  /**
   * Método para realizar el registro y logearse automáticamente.
   * @param credentials - Credenciales de registro del usuario.
   * @returns Observable con la respuesta de la API.
   */
  register(credentials: RegistroCredentials): Observable<any> {
    // Determinar el endpoint basado en el tipo de usuario
    const tipoUsuario: string = credentials.tipoUsuario.toLocaleLowerCase();
    const endpoint = this.apiEndpoints[tipoUsuario as Role];

    let formData = {
      ...credentials,
      tipoUsuario: undefined,
      password_confirm: undefined,
    };

    return this.http.post<RegistroResponse>(endpoint, formData).pipe(
      tap((response) => {
        // Manejar mensaje de éxito si es necesario
        this.google.eventEmitter('click-registro-correcto', {
          label: 'Click registro Success',
        });
        this.snackbar.show('Registro correcto', 4000);
      }),
      // Después del registro exitoso, iniciar sesión automáticamente
      switchMap(() =>
        this.loginService.login({
          correo: credentials.correo,
          password: credentials.password,
        })
      ),
      catchError((error: any) => {
        const errorMessage = error?.error?.error
          ? error.error.message
          : 'Error al crear la cuenta.';
        this.google.eventEmitter('click-registro-fallido', {
          label: 'Click registro Failed',
        });
        this.snackbar.show('Error en el registro:\n' + errorMessage, 4000);
        return throwError(() => error);
      })
    );
  }
}
