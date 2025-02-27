import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginCredentials, LoginResponse, User } from '@v2/models';
import { AuthState, Role, UserType } from '@v2/enums';
import { GoogleAnalyticsService, SnackbarService } from '@v2/services';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private google = inject(GoogleAnalyticsService);
  private snackbar = inject(SnackbarService);

  private saltHash = 'xdxd';
  private apiUrlUsers = 'https://accesos.nuevoloslagos.org/auth';
  private pass = 'sdaa@@gd@S221W';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      pass: this.pass,
    }),
  };

  // Definición de Signals para manejar el estado de autenticación y el usuario
  private _authState: WritableSignal<AuthState> = signal(AuthState.LoggedOut);
  private _currentUser: WritableSignal<User | null> = signal(null);
  private _authToken: WritableSignal<string | null> = signal(null);

  // Señales públicas de solo lectura
  public authState = this._authState.asReadonly() as WritableSignal<AuthState>;
  public currentUser =
    this._currentUser.asReadonly() as WritableSignal<User | null>;
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
        const parsedUser: User = JSON.parse(user);
        // Verificar si el rol es válido
        if (Object.values(UserType).includes(parsedUser.type)) {
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

    return this.http
      .post<LoginResponse>(
        `${this.apiUrlUsers}/login`,
        credentials,
        this.httpOptions
      )
      .pipe(
        tap((response: LoginResponse) => {
          if (response.token && response.user) {
            this.handleAuthentication(response.token, response.user);
            this.google.eventEmitter('click-login-correcto', {
              label: 'Click Login Success',
            });
            this.snackbar.show('Inicio de sesión correcto', 4000);
          } else {
            this.handleError(new Error('Respuesta de login inválida.'));
            this.google.eventEmitter('click-login-fallido', {
              label: 'Click Login failed',
            });
            const message = response?.message ?? 'Error al iniciar de sesión';
            this.snackbar.show(message, 4000);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const message = error?.error?.message ?? 'Error al iniciar de sesión';
          this.snackbar.show(message, 4000);
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
  private handleAuthentication(token: string, usuario: User): void {
    // Verificar si el rol es válido
    if (!Object.values(UserType).includes(usuario.type)) {
      this.handleError(new Error('Rol de usuario inválido.'));
      return;
    }

    // Guardar el token y el usuario en localStorage
    localStorage.setItem('authToken', token);
    // guarda el sector del usario en el localstorage
    


    localStorage.setItem('user', JSON.stringify(usuario));

    localStorage.setItem('sector', JSON.stringify(usuario.sector).toLowerCase());

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
    // Ante cualquier error, simplemente cambiamos el estado a LoggedOut
    this._authState.set(AuthState.LoggedOut);
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
    this._currentUser.set(null);
    this._authToken.set(null);
    this.snackbar.show('Sesión cerrada', 4000);

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
  getCurrentUser(): User | null {
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
