import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { UserType } from '@v2/enums';
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
  private endpoint: string = 'http://64.176.10.243:3020/auth/register';
  private pass = 'sdaa@@gd@S221W';

  private httpOptions = {
    headers: new HttpHeaders({
      pass: this.pass,
    }),
  };
  /**
   * Método para realizar el registro y logearse automáticamente.
   * @param credentials - Credenciales de registro del usuario.
   * @returns Observable con la respuesta de la API.
   */
  register(formData: FormData): Observable<any> {
    return this.http.post<any>(this.endpoint, formData, this.httpOptions).pipe(
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
          mail: formData.get('mail') as string,
          password: formData.get('password') as string,
        })
      ),
      catchError((error: any) => {
        const errorMessage = error?.error?.error
          ? error?.error?.error
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
