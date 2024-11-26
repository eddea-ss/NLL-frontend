// src/app/services/login.service.ts

import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginCredentials, LoginResponse, Usuario } from '@shared/models';
import { AuthState, Role } from '@shared/enums';
import { SnackbarService } from './snackbar.service';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private google = inject(GoogleAnalyticsService);

  private apiUrlUsers = 'https://accesos.nuevoloslagos.org/api/usuarios';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Definición de Signals para manejar el estado de autenticación y el usuario
  private _authState: WritableSignal<AuthState> = signal(AuthState.LoggedOut);
  private _authError: WritableSignal<string | null> = signal(null);
  private _currentUser: WritableSignal<Usuario | null> = signal(null);
  private _authToken: WritableSignal<string | null> = signal(null);

  // Señales públicas de solo lectura
  public authState = this._authState.asReadonly() as WritableSignal<AuthState>;
  public authError = this._authError.asReadonly() as WritableSignal<
    string | null
  >;
  public currentUser =
    this._currentUser.asReadonly() as WritableSignal<Usuario | null>;
  public authToken = this._authToken.asReadonly() as WritableSignal<
    string | null
  >;

  constructor() {
    // Inicializar el estado de autenticación basado en el token en localStorage
    let token: string | null = null;
    let user: string | null = null;
    try {
      token = localStorage.getItem('authToken') ?? '';
      user = localStorage.getItem('user') ?? '';
    } catch (e) {
      console.warn(
        'Error al obtener el token y el usuario desde localStorage',
        e
      );
    }

    if (token && user) {
      try {
        const parsedUser: Usuario = JSON.parse(user);
        // Verificar si el rol es válido
        if (Object.values(Role).includes(parsedUser.rol.nombreRol)) {
          this._authState.set(AuthState.LoggedIn);
          this._currentUser.set(parsedUser);
          this._authToken.set(token);
        } else {
          this.handleError(new Error('Rol de usuario inválido.'));
        }
      } catch (e) {
        console.error('Error al parsear el usuario desde localStorage', e);
        this.handleError(new Error('Datos de usuario inválidos.'));
      }
    } else {
      this._authState.set(AuthState.LoggedOut);
    }
  }

  /**
   * Método para realizar el login.
   * @param credentials - Credenciales del usuario (correo y password).
   * @returns Observable con la respuesta de la API.
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    this._authState.set(AuthState.Loading);
    this._authError.set(null);

    return this.http
      .post<LoginResponse>(
        `${this.apiUrlUsers}/login`,
        credentials,
        this.httpOptions
      )
      .pipe(
        tap((response: LoginResponse) => {
          if (response.token && response.usuario) {
            this.handleAuthentication(response.token, response.usuario);
            this.google.eventEmitter('click-login-correcto', {
              label: 'Click Login Success',
            });
          } else {
            this.handleError(new Error('Respuesta de login inválida.'));
            this.google.eventEmitter('click-login-fallido', {
              label: 'Click Login failed',
            });
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Método para manejar la autenticación exitosa.
   * @param token - Token de autenticación.
   * @param usuario - Información del usuario.
   */
  private handleAuthentication(token: string, usuario: Usuario): void {
    // Verificar si el rol es válido
    if (!Object.values(Role).includes(usuario.rol.nombreRol)) {
      this.handleError(new Error('Rol de usuario inválido.'));
      return;
    }

    // Guardar el token y el usuario en localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(usuario));

    // Actualizar los Signals
    this._authState.set(AuthState.LoggedIn);
    this._currentUser.set(usuario);
    this._authToken.set(token);

    // Opcional: Navegar a una ruta protegida después del login
    this.router.navigate(['/']);
  }

  /**
   * Método para manejar errores de autenticación.
   * @param error - Error ocurrido durante el login.
   */
  private handleError(error: HttpErrorResponse | Error): void {
    this._authState.set(AuthState.Error);
    if (error instanceof HttpErrorResponse) {
      this._authError.set(error.error?.message || 'Error de servidor.');
    } else if (error instanceof Error) {
      this._authError.set(error.message);
    } else {
      this._authError.set('Ocurrió un error inesperado.');
    }
  }

  /**
   * Método para realizar el logout.
   */
  logout(): void {
    // Remover los datos de autenticación del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('modelo-madurez');
    localStorage.removeItem('modelo-formacion');
    localStorage.removeItem('modelo-caracter');
    localStorage.removeItem('formacion-emprendedor');
    localStorage.removeItem('startup-emprendedor');

    // Actualizar los Signals
    this._authState.set(AuthState.LoggedOut);
    this._authError.set(null);
    this._currentUser.set(null);
    this._authToken.set(null);

    // Opcional: Navegar a la página de login después del logout
    this.router.navigate(['/']);
  }

  /**
   * Método para verificar si el usuario está autenticado.
   * @returns Booleano indicando si el usuario está autenticado.
   */
  isAuthenticated(): boolean {
    return this.authState() === AuthState.LoggedIn;
  }

  /**
   * Método para obtener el usuario actual.
   * @returns Usuario o null si no está autenticado.
   */
  getCurrentUser(): Usuario | null {
    return this.currentUser();
  }

  /**
   * Método para obtener el token de autenticación.
   * @returns Token de autenticación o null si no está disponible.
   */
  getAuthToken(): string | null {
    return this.authToken();
  }
}
