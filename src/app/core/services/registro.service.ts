// src/app/services/registro.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegistroCredentials, RegistroResponse } from '@shared/models';
import { Role } from '@shared/enums';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Definir endpoints para cada tipo de usuario
  private apiEndpoints: Record<Role, string> = {
    [Role.Usuario]: 'http://64.176.10.243:3021/api/personas',
    [Role.Empresa]: 'http://64.176.10.243:3021/api/empresas',
    [Role.Proveedor]: 'http://64.176.10.243:3021/api/proveedores',
  };

  /**
   * Método para realizar el registro y logearse automáticamente.
   * @param credentials - Credenciales de registro del usuario.
   * @returns Observable con la respuesta de la API.
   */
  register(credentials: RegistroCredentials): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('tipoUsuario', credentials.tipoUsuario);
    formData.append('correo', credentials.correo);
    formData.append('password', credentials.password);
    formData.append('eRut', 'https://www.ejemplo.com');

    // Campos específicos según el tipo de usuario
    switch (credentials.tipoUsuario) {
      case Role.Empresa:
        if (credentials.nombreEmpresa) formData.append('nombreEmpresa', credentials.nombreEmpresa);
        break;
      case Role.Proveedor:
        if (credentials.nombreProveedor) formData.append('nombreProveedor', credentials.nombreProveedor);
        break;
      case Role.Usuario:
        if (credentials.nombre) formData.append('nombre', credentials.nombre);
        break;
      default:
        break;
    }

    // Campos comunes para Empresa y Proveedor
    if (credentials.tipoUsuario === Role.Empresa || credentials.tipoUsuario === Role.Proveedor) {
      if (credentials.rut) formData.append('rut', credentials.rut);
      if (credentials.nombreRepresentante) formData.append('nombreRepresentante', credentials.nombreRepresentante);
      if (credentials.rutRepresentante) formData.append('rutRepresentante', credentials.rutRepresentante);
      if (credentials.estrategiaDigital !== undefined) formData.append('estrategiaDigital', String(credentials.estrategiaDigital));
      if (credentials.desafiosIndustria4 !== undefined) formData.append('desafiosIndustria4', String(credentials.desafiosIndustria4));
      if (credentials.prioridadAdopcion !== undefined) formData.append('prioridadAdopcion', String(credentials.prioridadAdopcion));
    }

    // Determinar el endpoint basado en el tipo de usuario
    const endpoint = this.apiEndpoints[credentials.tipoUsuario];

    return this.http.post<RegistroResponse>(endpoint, formData).pipe(
      tap(response => {
        // Manejar mensaje de éxito si es necesario
        console.log(response.message);
      }),
      // Después del registro exitoso, iniciar sesión automáticamente
      switchMap(() => this.loginService.login({ correo: credentials.correo, password: credentials.password })),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en el registro:', error);
        return throwError(() => error);
      })
    );
  }
}
