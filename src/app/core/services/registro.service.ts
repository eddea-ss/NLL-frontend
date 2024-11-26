// src/app/services/registro.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegistroCredentials, RegistroResponse } from '@shared/models';
import { Role } from '@shared/enums';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private snackbarService: SnackbarService
  ) {}

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
        this.snackbarService.show('Registro existoso');
      }),
      // Después del registro exitoso, iniciar sesión automáticamente
      switchMap(() =>
        this.loginService.login({
          correo: credentials.correo,
          password: credentials.password,
        })
      ),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en el registro:', error);
        this.snackbarService.show(error.error.message, 5000, 'OK');
        return throwError(() => error);
      })
    );
  }
}
